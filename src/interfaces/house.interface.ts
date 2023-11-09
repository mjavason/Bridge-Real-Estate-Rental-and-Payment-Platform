interface IHouse {
  id?: number | string;
  title: string;
  description: string;
  price: number;
  location: string;
  numberOfRooms: number;
  amenities: string;
  userId: string;
  deleted?: boolean;
}

export default IHouse;
