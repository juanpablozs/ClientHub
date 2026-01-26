# ClientHub (monorepo) — Updated

This is an expanded quickstart and developer guide for ClientHub.

Overview
- API: http://localhost:4000
- Web: http://localhost:5173

Quickstart (Docker)
1. Copy environment example

```bash
cp .env.example .env
```

2. Build and start services

```bash
docker compose up -d --build
```

3. Apply migrations + generate Prisma client

```bash
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
```

Development notes
- To run API locally (dev mode):

```bash
npm --workspace @clienthub/api run dev
```

- To run the web app locally:

```bash
npm --workspace @clienthub/web run dev
```

Prisma and migrations
- To create a new migration while developing:

```bash
docker compose exec -e DATABASE_URL="mysql://root:rootpassword@mysql:3306/clienthub" api \
  npx prisma migrate dev --name my_migration
```

- To generate the Prisma client locally:

```bash
cd apps/api
npx prisma generate
```

Testing
- Run API tests:

```bash
cd apps/api
npm test
```

Notes on Docker compose
- The default `docker-compose.yml` intentionally does not mount the `apps/api` source into the container. This prevents the container's built `dist` from being overwritten. For hot-reload development, either run `npm run dev` locally or add a `docker-compose.override.yml` that mounts the source and starts the dev command.

Files of interest
- `apps/api/prisma/schema.prisma`
- `apps/api/src` — backend source
- `apps/web/src` — frontend source

If you'd like, I can now replace `README.md` and `README_UPDATED.md` with these English versions.
