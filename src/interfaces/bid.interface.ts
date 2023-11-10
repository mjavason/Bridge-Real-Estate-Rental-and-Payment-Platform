interface IBid {
  id?: number | string;
  HouseId?: string | number;
  amount: number;
  status: string;
  deleted?: boolean;
}

export default IBid;
