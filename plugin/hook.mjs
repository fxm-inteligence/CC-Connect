#!/usr/bin/env node
// Мост между хуками Claude Code и локальным демоном CC Connect. Без зависимостей.
// Любая ошибка (нет конфига, демон не запущен) = тихий выход с кодом 0: Claude работает как обычно.
import http from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const slug = process.argv[2];
if (!slug || !/^[a-z]+$/.test(slug)) process.exit(0);
// необязательный третий аргумент: какой агент прислал хук (по умолчанию claude)
const agent = process.argv[3] === 'codex' ? 'codex' : 'claude';

let cfg;
try {
  const p = join(process.env.CMOB_HOME || join(homedir(), '.cmob'), 'config.json');
  if (!existsSync(p)) process.exit(0);
  cfg = JSON.parse(readFileSync(p, 'utf8'));
} catch {
  process.exit(0);
}
if (!cfg?.port || !cfg?.hookToken) process.exit(0);

const chunks = [];
process.stdin.on('data', (c) => chunks.push(c));
process.stdin.on('error', () => process.exit(0));
process.stdin.on('end', () => {
  const payload = Buffer.concat(chunks);
  const req = http.request(
    {
      host: '127.0.0.1',
      port: cfg.port,
      path: `/h/${cfg.hookToken}/${slug}${agent === 'codex' ? '?agent=codex' : ''}`,
      method: 'POST',
      headers: { 'content-type': 'application/json', 'content-length': payload.length },
    },
    (res) => {
      const out = [];
      res.on('data', (c) => out.push(c));
      res.on('end', () => {
        const body = Buffer.concat(out).toString('utf8').trim();
        if (res.statusCode === 200 && body && body !== '{}') process.stdout.write(body);
        process.exit(0);
      });
      res.on('error', () => process.exit(0));
    },
  );
  req.on('error', () => process.exit(0));
  req.end(payload);
});
