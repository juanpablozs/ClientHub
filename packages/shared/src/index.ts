export type User = {
  id: string;
  name: string;
  email: string;
};

export type Client = {
  id: string;
  ownerId: string;
  name: string;
  email?: string | null;
  company?: string | null;
  status: 'lead' | 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  ownerId: string;
  clientId: string;
  name: string;
  description?: string | null;
  status: 'planned' | 'in_progress' | 'done' | 'on_hold';
  startDate?: string | null;
  endDate?: string | null;
  budget?: number | null;
  createdAt: string;
  updatedAt: string;
};
