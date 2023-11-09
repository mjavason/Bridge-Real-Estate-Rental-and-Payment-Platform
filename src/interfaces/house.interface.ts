interface IHouse {
  id?: number | string;
  userId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  numberOfRooms: number;
  amenities: string;
  deleted?: boolean;
}

export default IHouse;
