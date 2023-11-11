import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import IBid from '../interfaces/bid.interface';
import House from './house.model';
import User from './user.model';

class Bid extends Model<IBid> {}

Bid.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['deleted', 'HouseId', 'UserId'] },
      include: [House, User],
    },
    timestamps: true,
  },
);

House.hasMany(Bid);
User.hasMany(Bid);
Bid.belongsTo(House);
Bid.belongsTo(User);

export default Bid;
