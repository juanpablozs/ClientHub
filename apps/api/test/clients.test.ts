import './setup';
import { vi } from 'vitest';

vi.mock('../src/prisma', () => ({ default: {} }));
vi.mock('../src/services/clientService', () => {
  return {
    createClient: vi.fn(async (ownerId: string, data: any) => ({ id: 'client-1', ownerId, ...data })),
    listClients: vi.fn(async (ownerId: string) => ({ total: 1, items: [{ id: 'client-1', name: 'Client A', ownerId }], page: 1, perPage: 10 })),
    getClientById: vi.fn(async (ownerId: string, id: string) => ({ id, ownerId, name: 'Client A' })),
    updateClient: vi.fn(async () => ({ count: 1 })),
    deleteClient: vi.fn(async () => ({ count: 1 }))
  } as any;
});

vi.mock('../src/utils/jwt', () => ({
  verifyAccessToken: () => ({ userId: 'user-1' })
}));

import request from 'supertest';
import app from '../src/app';

describe('Clients routes', () => {
  it('create client (protected) returns created client', async () => {
    const res = await request(app).post('/api/clients').set('Authorization', 'Bearer token').send({ name: 'Client A', company: 'Acme' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Client A');
  });

  it('list clients returns paginated items', async () => {
    const res = await request(app).get('/api/clients').set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
