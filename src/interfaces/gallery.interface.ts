interface IGallery {
  id?: number | string;
  HouseId?: number | string;
  House?: any;
  type: string;
  url: string;
  deleted?: boolean;
}

export default IGallery;
