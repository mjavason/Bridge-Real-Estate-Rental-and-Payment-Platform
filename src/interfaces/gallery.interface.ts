interface IGallery {
  houseId: number | string;
  type: string;
  url: string;
  deleted?: boolean;
}

export default IGallery;
