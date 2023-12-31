import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import IHouse from '../interfaces/house.interface';
import User from './user.model';

class House extends Model<IHouse> {}

House.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amenities: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['deleted', 'UserId'] },
      include: [User],
    },
    timestamps: true,
  },
);

// Define the association between User and House and Gallery
User.hasMany(House);
House.belongsTo(User);

export default House;
