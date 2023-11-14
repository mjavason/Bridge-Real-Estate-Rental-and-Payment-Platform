interface ITransaction {
  id?: number | string;
  senderId?: number | string;
  recipientId?: number | string;
  amount: number;
  deleted?: boolean;
}

export default ITransaction;
