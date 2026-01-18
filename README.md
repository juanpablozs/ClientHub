# ClientHub (monorepo)

Mini SaaS para gestión de clientes y proyectos.

Stack principal: Node.js + TypeScript (Express, Vite), Prisma, MySQL, React.

Quick start (local with Docker):

1. Copy example env:

```bash
cp .env.example .env
```

2. Build and start with Docker Compose:

```bash
docker compose up --build
```

3. Run migrations (inside `apps/api` container) after DB is ready:

```bash
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
```

Notes:
- API: http://localhost:4000
- Web: http://localhost:5173

See `API_EXAMPLES.md` for example curl requests.
# ClientHub