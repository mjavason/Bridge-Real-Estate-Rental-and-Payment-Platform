interface IBid {
  id?: number | string;
  UserId?: string | number;
  HouseId?: string | number;
  amount: number;
  status: string;
  deleted?: boolean;
}

export default IBid;
