# The World Migration frontend

React/Vite public website and admin dashboard. See the root README.md for setup,
production reverse proxy, key handling, testing and database migration.

`npm ci --ignore-scripts` installs the supplied lockfile; `npm run build` creates dist.
All API requests use the same origin. Vite proxies /api to 127.0.0.1:5000 locally.
No frontend environment secret is needed. Never place secrets in VITE_ variables.
Do not use the Vite development/preview server as a production web server.
