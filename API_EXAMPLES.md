# API Examples

Register:

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password"}' -c cookie.txt
```

Login:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password"}' -c cookie.txt
```

Get clients (protected):

```bash
curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:4000/api/clients
```

Create client:

```bash
curl -X POST http://localhost:4000/api/clients -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d '{"name":"Client A","company":"Acme"}'
```

Get dashboard stats:

```bash
curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://localhost:4000/api/stats/dashboard
```
