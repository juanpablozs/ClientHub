import prisma from '../prisma';
import bcrypt from 'bcrypt';

export async function createUser(data: { name: string; email: string; password: string }) {
  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({ data: { name: data.name, email: data.email, password: hashed } });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function validatePassword(user: any, candidate: string) {
  return bcrypt.compare(candidate, user.password);
}

export async function saveRefreshToken(userId: string, token: string, expiresAt: Date) {
  return prisma.refreshToken.create({ data: { token, userId, expiresAt } });
}

export async function revokeRefreshToken(token: string) {
  return prisma.refreshToken.updateMany({ where: { token }, data: { revoked: true } });
}

export async function findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({ where: { token } });
}
