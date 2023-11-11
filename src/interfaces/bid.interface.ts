interface IBid {
  id?: number | string;
  UserId?: string | number;
  User?: any;
  HouseId?: string | number;
  House?: any;
  amount: number;
  status: string;
  deleted?: boolean;
}

export default IBid;
