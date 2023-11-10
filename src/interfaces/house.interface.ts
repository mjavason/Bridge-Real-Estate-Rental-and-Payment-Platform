interface IHouse {
  id?: number | string;
  UserId?: number | string;
  title: string;
  description: string;
  price: number;
  location: string;
  numberOfRooms: number;
  amenities: string;
  deleted?: boolean;
}

export default IHouse;
