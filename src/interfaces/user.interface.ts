interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  role: string; //user or admin or client or tenant
  account_balance: number;
  password: string;
  deleted?: boolean;
}

export default IUser;
