import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import IUser from '../interfaces/user.interface';

class User extends Model<IUser> {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountBalance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    password: {
      type: DataTypes.STRING,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  },
);

export default User;
