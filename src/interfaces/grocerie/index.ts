import { GetQueryInterface } from 'interfaces';

export interface GrocerieInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  vegetables?: string;
  total_amount?: string;
  date?: any;

  _count?: {};
}

export interface GrocerieGetQueryInterface extends GetQueryInterface {
  id?: string;
  vegetables?: string;
  total_amount?: string;
}
