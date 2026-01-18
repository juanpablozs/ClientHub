import { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import { createProjectSchema, updateProjectSchema, projectListQuery } from '../validators/project';

export async function createProject(req: Request, res: Response) {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const ownerId = (req as any).user.id;
  const project = await projectService.createProject(ownerId, parsed.data);
  res.json(project);
}

export async function getProject(req: Request, res: Response) {
  const ownerId = (req as any).user.id;
  const project = await projectService.getProjectById(ownerId, req.params.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
}

export async function updateProject(req: Request, res: Response) {
  const parsed = updateProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const ownerId = (req as any).user.id;
  const result = await projectService.updateProject(ownerId, req.params.id, parsed.data);
  if (result.count === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
}

export async function deleteProject(req: Request, res: Response) {
  const ownerId = (req as any).user.id;
  const result = await projectService.deleteProject(ownerId, req.params.id);
  if (result.count === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
}

export async function listProjects(req: Request, res: Response) {
  const q = projectListQuery.safeParse(req.query);
  if (!q.success) return res.status(400).json({ error: q.error.errors });
  const ownerId = (req as any).user.id;
  const page = q.data.page ? parseInt(q.data.page, 10) : 1;
  const perPage = q.data.perPage ? parseInt(q.data.perPage, 10) : 10;
  const data = await projectService.listProjects(ownerId, { status: q.data.status, clientId: q.data.clientId, page, perPage });
  res.json(data);
}
