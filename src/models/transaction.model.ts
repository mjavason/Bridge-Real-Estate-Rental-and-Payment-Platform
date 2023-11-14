import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import ITransaction from '../interfaces/transaction.interface';
import User from './user.model'; // Make sure to import the User model

class Transaction extends Model<ITransaction> {}

Transaction.init(
  {
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    recipientId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.NUMBER,
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
      attributes: { exclude: ['deleted'] },
    },
    timestamps: true,
  },
);

// Establishing the relationships
Transaction.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender',
});

Transaction.belongsTo(User, {
  foreignKey: 'recipientId',
  as: 'recipient',
});

User.hasMany(Transaction);

export default Transaction;
