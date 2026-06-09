import type { Request } from 'express';

export interface RequestNew extends Request {
  users: any;
}
