import UserModel from '../models/user.model'; // Import your Sequelize model
import IUser from '../interfaces/user.interface'; // Import your IUser interface

class UserService {
  async create(body: IUser) {
    return await UserModel.create(body);
  }

  async getAll(pagination: number) {
    return await UserModel.findAll({
      where: { deleted: false },
      limit: 10,
      offset: pagination,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['__v'] },
    });
  }

  async update(searchDetails: Partial<IUser>, update: Partial<IUser>) {
    return await UserModel.findOne({
      where: { ...searchDetails, deleted: false },
      attributes: { exclude: ['__v'] },
    }).then(async (user) => {
      if (user) {
        await user.update(update);
        return user;
      }
      return null;
    });
  }

  async find(searchData: Partial<IUser>) {
    return await UserModel.findAll({
      where: { ...searchData, deleted: false },
      attributes: { exclude: ['__v'] },
    });
  }

  async findOne(searchData: Partial<IUser>) {
    return UserModel.findOne({
      where: { ...searchData, deleted: false },
      attributes: { exclude: ['__v'] },
    });
  }

  async findOneReturnPassword(searchData: Partial<IUser>) {
    return UserModel.findOne({
      where: { ...searchData, deleted: false },
      attributes: { exclude: ['__v'], include: ['password'] },
    });
  }

  async softDelete(searchParams: Partial<IUser>) {
    return await UserModel.findOne({
      where: { ...searchParams, deleted: false },
      attributes: { exclude: ['__v'] },
    }).then(async (user) => {
      if (user) {
        await user.update({ deleted: true });
        return user;
      }
      return null;
    });
  }

  async hardDelete(searchParams: Partial<IUser>) {
    return await UserModel.findOne({
      where: searchParams,
      attributes: { exclude: ['__v'] },
    }).then(async (user) => {
      if (user) {
        await user.destroy();
        return user;
      }
      return null;
    });
  }

  async exists(searchParams: Partial<IUser>) {
    return await UserModel.findOne({ where: searchParams }).then((user) => !!user);
  }
}

export const userService = new UserService();
