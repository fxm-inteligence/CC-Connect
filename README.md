# CC Connect — плагин для Claude Code и Codex

Плагин связывает Claude Code (и Codex) на вашем компьютере с мобильным приложением CC Connect: уведомления, ответы на вопросы агента, разрешения и новые задачи с телефона.

```
claude plugin install cmob --marketplace fxm-inteligence/CC-Connect
```

Затем начните новую сессию Claude и скажите: «подключи телефон». Подробности — в приложении, на экране «Подключите компьютер».

**Только Codex, без Claude Code** (нужен Node.js 22+):

```
node -e "fetch('https://raw.githubusercontent.com/fxm-inteligence/CC-Connect/main/plugin/dist/cmob.mjs').then(r=>r.text()).then(t=>{require('fs').writeFileSync('cmob.mjs',t);require('child_process').spawnSync(process.execPath,['cmob.mjs','setup-codex'],{stdio:'inherit'})})"
```

Команда скачивает `plugin/dist/cmob.mjs`, подключает Codex и показывает QR для телефона. После неё перезапустите Codex и подтвердите хуки через /hooks.

Требуется Node.js 22+. Конфигурация и ключи хранятся в `~/.cmob`. Код демона находится в `plugin/dist/cmob.mjs`.
