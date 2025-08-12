export type EntityStatus = 'active' | 'inactive' | 'pending';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface User {
  id?: string;
  password?: string;
  email?: string;
  userName?: string;
  fullName?: string;
  roles?: string[];
  createdAt?: string;
}

export interface Role {
  id: string;
  name: string;
  // permissions: string[];
}



export interface Account {
  id: number;
  name: string;
  description?: string;
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: string;
  contactId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: number;
  title: string;
  description: string;
  value: number;
  status: EntityStatus;
  accountId: number;
  contactId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  // status?: EntityStatus;
  // source?: string;
  // priority?: TaskPriority;
  // assignedTo?: string;
  notes?: string;
  // lastContactDate?: string;
  createdAt?: string;
  updatedAt?: string;
  id?: number;
}

export interface Account {}
export interface Contact {}
export interface Deal {}
export interface Product {}


export type CreateTaskPayload = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskPayload = Partial<CreateTaskPayload>;