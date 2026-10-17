# CC Connect — плагин для Claude Code и Codex

Плагин связывает Claude Code (и Codex) на вашем компьютере с мобильным приложением CC Connect: уведомления, ответы на вопросы агента, разрешения и новые задачи с телефона.

```
claude plugin install cmob --marketplace fxm-inteligence/CC-Connect
```

Затем начните новую сессию Claude и скажите: «подключи телефон». Подробности — в приложении, на экране «Подключите компьютер».

**Codex** (без Claude Code; нужен Node.js 22+) — плагин:

```
codex plugin marketplace add fxm-inteligence/CC-Connect
```

Затем в Codex: /plugins → включить CC Connect → /hooks → подтвердить хуки → перезапуск → «подключи телефон». Если плагинов в вашем Codex нет, одна команда (не сочетайте с плагином):

```
node -e "fetch('https://raw.githubusercontent.com/fxm-inteligence/CC-Connect/main/plugin/dist/cmob.mjs').then(r=>r.text()).then(t=>{require('fs').writeFileSync('cmob.mjs',t);require('child_process').spawnSync(process.execPath,['cmob.mjs','setup-codex'],{stdio:'inherit'})})"
```

Команда скачивает `plugin/dist/cmob.mjs`, подключает Codex и показывает QR для телефона. После неё перезапустите Codex и подтвердите хуки через /hooks.

Требуется Node.js 22+. Конфигурация и ключи хранятся в `~/.cmob`. Код демона находится в `plugin/dist/cmob.mjs`.
