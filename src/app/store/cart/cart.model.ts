import { User } from '../user/users.model';

export interface Cart {
  id?: string;
  status: CartStatus;
  userId: User['id'];
}

export type CartStatus = 'Pending' | 'Completed';
