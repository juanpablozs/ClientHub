import './setup';
import { vi } from 'vitest';

vi.mock('../src/prisma', () => ({ default: {} }));
vi.mock('../src/services/authService', () => {
  return {
    createUser: vi.fn(async (data: any) => ({ id: 'user-1', ...data })),
    findUserByEmail: vi.fn(async (email: string) => null),
    validatePassword: vi.fn(async () => true),
    saveRefreshToken: vi.fn(async () => ({})),
    findRefreshToken: vi.fn(async (token: string) => ({ token, revoked: false, userId: 'user-1' })),
    revokeRefreshToken: vi.fn(async () => ({}))
  } as any;
});

vi.mock('../src/utils/jwt', () => {
  return {
    signAccessToken: () => 'access-token',
    signRefreshToken: () => 'refresh-token',
    verifyRefreshToken: () => ({ userId: 'user-1' }),
    verifyAccessToken: () => ({ userId: 'user-1' })
  } as any;
});
import request from 'supertest';
import app from '../src/app';

describe('Auth routes', () => {
  it('register returns accessToken and sets cookie', async () => {
    const res = await request(app).post('/api/auth/register').send({ name: 'Alice', email: 'alice@example.com', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('login returns accessToken and sets cookie when credentials valid', async () => {
    const authService = await import('../src/services/authService');
    (authService.findUserByEmail as any).mockResolvedValue({ id: 'user-1', email: 'alice@example.com', name: 'Alice', password: 'hashed' });
    const res = await request(app).post('/api/auth/login').send({ email: 'alice@example.com', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('refresh returns new accessToken when refresh token valid', async () => {
    const res = await request(app).post('/api/auth/refresh').set('Cookie', ['refreshToken=refresh-token']);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('logout clears cookie and revokes refresh token', async () => {
    const res = await request(app).post('/api/auth/logout').set('Cookie', ['refreshToken=refresh-token']);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
