import prisma from '../prisma';

export async function createProject(ownerId: string, data: any) {
  return prisma.project.create({ data: { ...data, ownerId } });
}

export async function getProjectById(ownerId: string, id: string) {
  return prisma.project.findFirst({ where: { id, ownerId } });
}

export async function updateProject(ownerId: string, id: string, data: any) {
  return prisma.project.updateMany({ where: { id, ownerId }, data });
}

export async function deleteProject(ownerId: string, id: string) {
  return prisma.project.deleteMany({ where: { id, ownerId } });
}

export async function listProjects(ownerId: string, opts: { status?: string; clientId?: string; page?: number; perPage?: number }) {
  const { status, clientId, page = 1, perPage = 10 } = opts;
  const where: any = { ownerId };
  if (status) where.status = status;
  if (clientId) where.clientId = clientId;
  const total = await prisma.project.count({ where });
  const items = await prisma.project.findMany({ where, skip: (page - 1) * perPage, take: perPage, orderBy: { createdAt: 'desc' } });
  return { total, items, page, perPage };
}
