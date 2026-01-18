import { Request, Response } from 'express';
import * as clientService from '../services/clientService';
import { createClientSchema, updateClientSchema, clientListQuery } from '../validators/client';

export async function createClient(req: Request, res: Response) {
  const parsed = createClientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const ownerId = (req as any).user.id;
  const client = await clientService.createClient(ownerId, parsed.data);
  res.json(client);
}

export async function getClient(req: Request, res: Response) {
  const ownerId = (req as any).user.id;
  const client = await clientService.getClientById(ownerId, req.params.id);
  if (!client) return res.status(404).json({ error: 'Not found' });
  res.json(client);
}

export async function updateClient(req: Request, res: Response) {
  const parsed = updateClientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const ownerId = (req as any).user.id;
  const result = await clientService.updateClient(ownerId, req.params.id, parsed.data);
  if (result.count === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
}

export async function deleteClient(req: Request, res: Response) {
  const ownerId = (req as any).user.id;
  const result = await clientService.deleteClient(ownerId, req.params.id);
  if (result.count === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
}

export async function listClients(req: Request, res: Response) {
  const q = clientListQuery.safeParse(req.query);
  if (!q.success) return res.status(400).json({ error: q.error.errors });
  const ownerId = (req as any).user.id;
  const page = q.data.page ? parseInt(q.data.page, 10) : 1;
  const perPage = q.data.perPage ? parseInt(q.data.perPage, 10) : 10;
  const data = await clientService.listClients(ownerId, { q: q.data.q, status: q.data.status, page, perPage });
  res.json(data);
}
