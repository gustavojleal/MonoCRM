import { EntityStatus, ContactHistory } from '../../common/types/types';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  status?: EntityStatus;
  source?: string;
  accountId?: string;
  createdAt?: string;
  updatedAt?: string;
  history?: ContactHistory[];
}