interface IUser {
  id?: number | string;
  firstName: string;
  lastName: string;
  email: string;
  role: string; //user or admin or client or tenant
  accountBalance: number;
  password: string;
  deleted?: boolean;
}

export default IUser;
