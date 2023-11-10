interface IGallery {
  id?: number | string;
  HouseId?: number | string;
  type: string;
  url: string;
  deleted?: boolean;
}

export default IGallery;
