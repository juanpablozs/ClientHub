# ClientHub (monorepo)

Mini SaaS to manage clients and projects.

Stack: Node.js + TypeScript (Express, Vite), Prisma, MySQL, React.

Quick start (Docker recommended)
- API: http://localhost:4000
- Web: http://localhost:5173

Prerequisites
- Docker & Docker Compose (recommended) or Node.js + npm for local development

Install (using npm workspaces)
1. From the repository root, install dependencies:

```bash
npm install
```

Quickstart (Docker)
1. Copy the example environment file:

```bash
# Bash / WSL
cp .env.example .env

# PowerShell
# Copy-Item .env.example .env
```

2. Build and start services with Docker Compose:

```bash
docker compose up -d --build
```

3. Apply Prisma migrations and generate the client (one-time):

```bash
# For production/CI (deploy existing migrations):
docker compose exec api npx prisma migrate deploy

# Generate Prisma Client
docker compose exec api npx prisma generate

# For initial development (create + apply migration interactively):
docker compose exec -e DATABASE_URL="mysql://root:rootpassword@mysql:3306/clienthub" api \
  npx prisma migrate dev --name init
```

Notes about `DATABASE_URL`
- Inside Docker Compose the MySQL host is `mysql` (e.g. `mysql://user:password@mysql:3306/clienthub`).
- From the host machine use `127.0.0.1:3306` (e.g. `mysql://user:password@127.0.0.1:3306/clienthub`).

Verify the API is responding:

```bash
curl http://localhost:4000/health
# should return { "ok": true }
```

Local development (without Docker)
- API (from repo root or `apps/api`):

```bash
npm --workspace @clienthub/api run dev
```

- Web (from `apps/web`):

```bash
npm --workspace @clienthub/web run dev
```

Tests
- Run API tests:

```bash
cd apps/api
npm test
```

Prisma
- Generate the Prisma client (for local dev):

```bash
cd apps/api
npx prisma generate
```

Docker / iterative development
- The `docker-compose.yml` does not mount source files into the `api` container by default to avoid overwriting the built `dist` directory. For live-reload during development you can either:
  - run the API locally with `npm run dev`, or
  - create a `docker-compose.override.yml` that mounts `./apps/api` and starts `npm run dev` inside the container.

Useful files
- `apps/api/prisma/schema.prisma` — database schema
- `API_EXAMPLES.md` — example curl requests (register/login/clients)

Next suggested steps
- Run `curl http://localhost:4000/health` to verify the API.
- Start the frontend (`docker compose up -d web`) or run it locally with `npm run dev`.
- Run tests (`cd apps/api && npm test`).

If you want, I can replace the original README files with these English versions or apply the changes directly to the existing files.
