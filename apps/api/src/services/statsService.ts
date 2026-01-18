import prisma from '../prisma';

export async function dashboardStats(ownerId: string) {
  const totalClients = await prisma.client.count({ where: { ownerId } });
  const clientsByStatus = await prisma.client.groupBy({ by: ['status'], where: { ownerId }, _count: { status: true } });
  const totalProjects = await prisma.project.count({ where: { ownerId } });
  const projectsByStatus = await prisma.project.groupBy({ by: ['status'], where: { ownerId }, _count: { status: true } });
  return { totalClients, clientsByStatus, totalProjects, projectsByStatus };
}
