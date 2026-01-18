import prisma from '../prisma';

export async function createClient(ownerId: string, data: any) {
  return prisma.client.create({ data: { ...data, ownerId } });
}

export async function getClientById(ownerId: string, id: string) {
  return prisma.client.findFirst({ where: { id, ownerId } });
}

export async function updateClient(ownerId: string, id: string, data: any) {
  return prisma.client.updateMany({ where: { id, ownerId }, data });
}

export async function deleteClient(ownerId: string, id: string) {
  return prisma.client.deleteMany({ where: { id, ownerId } });
}

export async function listClients(ownerId: string, opts: { q?: string; status?: string; page?: number; perPage?: number }) {
  const { q, status, page = 1, perPage = 10 } = opts;
  const where: any = { ownerId };
  if (status) where.status = status;
  if (q) where.OR = [{ name: { contains: q, mode: 'insensitive' } }, { company: { contains: q, mode: 'insensitive' } }];
  const total = await prisma.client.count({ where });
  const items = await prisma.client.findMany({ where, skip: (page - 1) * perPage, take: perPage, orderBy: { createdAt: 'desc' } });
  return { total, items, page, perPage };
}
