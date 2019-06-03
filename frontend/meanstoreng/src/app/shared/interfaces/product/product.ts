import { Department } from '../department/department';

export interface Product {
  _id ?: string;
  departments: Department[] | string[];
  name: string;
  stock: number;
  price: number;
  description: string;
}
