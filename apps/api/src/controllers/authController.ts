import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../validators/auth';
import * as authService from '../services/authService';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const existing = await authService.findUserByEmail(parsed.data.email);
  if (existing) return res.status(409).json({ error: 'Email already in use' });
  const user = await authService.createUser(parsed.data as { name: string; email: string; password: string });
  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });
  await authService.saveRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });
  res.json({ accessToken, user: { id: user.id, email: user.email, name: user.name } });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const user = await authService.findUserByEmail(parsed.data.email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await authService.validatePassword(user, parsed.data.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });
  await authService.saveRefreshToken(user.id, refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });
  res.json({ accessToken, user: { id: user.id, email: user.email, name: user.name } });
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ error: 'Missing refresh token' });
  try {
    const payload = verifyRefreshToken(token);
    const dbToken = await authService.findRefreshToken(token);
    if (!dbToken || dbToken.revoked) return res.status(401).json({ error: 'Invalid refresh token' });
    const accessToken = signAccessToken({ userId: payload.userId });
    const user = await authService.findUserById(payload.userId);
    res.json({ accessToken, user: user ? { id: user.id, email: user.email, name: user.name } : null });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.refreshToken;
  if (token) await authService.revokeRefreshToken(token);
  res.clearCookie('refreshToken');
  res.json({ ok: true });
}
