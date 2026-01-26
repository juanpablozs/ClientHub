import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const ACCESS_SECRET: Secret = (process.env.JWT_ACCESS_TOKEN_SECRET as Secret) || 'dev_access_secret';
const REFRESH_SECRET: Secret = (process.env.JWT_REFRESH_TOKEN_SECRET as Secret) || 'dev_refresh_secret';

export function signAccessToken(payload: object): string {
  const opts = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' } as SignOptions;
  return jwt.sign(payload as any, ACCESS_SECRET as any, opts as any);
}

export function signRefreshToken(payload: object): string {
  const opts = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' } as SignOptions;
  return jwt.sign(payload as any, REFRESH_SECRET as any, opts as any);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET as any) as any;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET as any) as any;
}
