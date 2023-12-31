import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import IGallery from '../interfaces/gallery.interface';
import House from './house.model';

class Gallery extends Model<IGallery> {}

Gallery.init(
  {
    // houseId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: House,
    //     key: 'id',
    //   },
    // },
    type: {
      type: DataTypes.STRING, // 'image' or 'video'
      allowNull: false,
    },
    url: {
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
      attributes: { exclude: ['deleted', 'HouseId'] },
      include: [House],
    },
    timestamps: true,
  },
);

House.hasMany(Gallery);
Gallery.belongsTo(House);

export default Gallery;
