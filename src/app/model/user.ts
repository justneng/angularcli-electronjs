import {Department} from './department';

export class User {
  _id: string;
  createdAt: Date;
  timestampData: Date;
  name: string;
  department: Department;
  email: string;
  telephoneNo: string;
}
