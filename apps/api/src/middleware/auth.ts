import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing authorization header' });
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid authorization header' });
  try {
    const payload = verifyAccessToken(parts[1]);
    (req as any).user = { id: payload.userId };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
