import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import IUser from '../interfaces/user.interface';

class UserModel extends Model<IUser> {}

UserModel.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
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
    account_balance: {
      type: DataTypes.NUMBER,
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

export default UserModel;
