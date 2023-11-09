import UserModel from '../models/user.model';
import IUser from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import { injectable } from 'inversify';

/**
 * Service class for user-related operations.
 */
@injectable()
export class UserService {
  /**
   * Hash a text
   *
   * @param {string} text - Text to be hashed.
   * @returns {Promise<string>} Hashed string.
   */
  async hashPassword(text: string) {
    const saltRounds = 10; // You can adjust the number of rounds for security
    return await bcrypt.hash(text, saltRounds);
  }

  /**
   * Create a new user.
   *
   * @param {IUser} body - User data.
   * @returns {Promise<IUser|null>} The created user or null on error.
   */
  async create(body: IUser) {
    try {
      const user = await UserModel.create(body);
      return user.get();
    } catch (error: any) {
      console.error('Error in create:', error.message);
      return null;
    }
  }

  /**
   * Get a list of users.
   *
   * @param {number} pagination - Offset for pagination.
   * @returns {Promise<IUser[]|null>} An array of users or null on error.
   */
  async getAll(pagination: number = 0) {
    try {
      const users = await UserModel.findAll({
        where: { deleted: false },
        limit: 10,
        offset: pagination,
        order: [['createdAt', 'DESC']],
      });
      return users.map((user) => user.get());
    } catch (error: any) {
      console.error('Error in getAll:', error.message);
      return null;
    }
  }

  /**
   * Update a user's information.
   *
   * @param {Partial<IUser>} searchDetails - Search criteria.
   * @param {Partial<IUser>} update - Updated user data.
   * @returns {Promise<IUser|null>} The updated user or null if the user is not found or on error.
   */
  async update(searchDetails: Partial<IUser>, update: Partial<IUser>) {
    try {
      const user = await UserModel.findOne({
        where: { ...searchDetails, deleted: false },
      });

      if (user) {
        await user.update(update);
        return user.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in update:', error.message);
      return null;
    }
  }

  /**
   * Find users based on search criteria.
   *
   * @param {Partial<IUser>} searchData - Search criteria.
   * @returns {Promise<IUser[]|null>} An array of users matching the search criteria or null on error.
   */
  async find(searchData: Partial<IUser>) {
    try {
      const users = await UserModel.findAll({
        where: { ...searchData, deleted: false },
      });
      return users.map((user) => user.get());
    } catch (error: any) {
      console.error('Error in find:', error.message);
      return null;
    }
  }

  /**
   * Find a user based on search criteria.
   *
   * @param {Partial<IUser>} searchData - Search criteria.
   * @returns {Promise<IUser|null>} The user matching the search criteria or null if not found or on error.
   */
  async findOne(searchData: Partial<IUser>) {
    try {
      const user = await UserModel.findOne({
        where: { ...searchData, deleted: false },
      });

      if (user) {
        return user.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in findOne:', error.message);
      return null;
    }
  }

  /**
   * Find a user based on search criteria and include the password field.
   *
   * @param {Partial<IUser>} searchData - Search criteria.
   * @returns {Promise<IUser|null>} The user matching the search criteria with the password field or null if not found or on error.
   */
  async findOneReturnPassword(searchData: Partial<IUser>) {
    try {
      const user = await UserModel.findOne({
        where: { ...searchData, deleted: false },
        attributes: { include: ['password'] },
      });

      if (user) {
        return user.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in findOneReturnPassword:', error.message);
      return null;
    }
  }

  /**
   * Soft delete a user based on search criteria.
   *
   * @param {Partial<IUser>} searchParams - Search criteria for the user to delete.
   * @returns {Promise<IUser|null>} The deleted user or null if not found or on error.
   */
  async softDelete(searchParams: Partial<IUser>) {
    try {
      const user = await UserModel.findOne({
        where: { ...searchParams, deleted: false },
      });

      if (user) {
        await user.update({ deleted: true });
        return user.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in softDelete:', error.message);
      return null;
    }
  }

  /**
   * Hard delete a user based on search criteria.
   *
   * @param {Partial<IUser>} searchParams - Search criteria for the user to delete.
   * @returns {Promise<IUser|null>} The deleted user or null if not found or on error.
   */
  async hardDelete(searchParams: Partial<IUser>) {
    try {
      const user = await UserModel.findOne({
        where: searchParams,
      });

      if (user) {
        await user.destroy();
        return user.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in hardDelete:', error.message);
      return null;
    }
  }

  /**
   * Check if a user with the given search parameters exists.
   *
   * @param {Partial<IUser>} searchParams - Search criteria to check for the user's existence.
   * @returns {Promise<boolean|null>} True if the user exists, false if not found, or null on error.
   */
  async exists(searchParams: Partial<IUser>) {
    try {
      const user = await UserModel.findOne({ where: searchParams });
      return !!user;
    } catch (error: any) {
      console.error('Error in exists:', error.message);
      return null;
    }
  }

  /**
   * Get the count of documents based on the provided search criteria.
   *
   * @param {object} searchData - The criteria to search for documents.
   * @returns {Promise<number | null>} - The count of documents or null if an error occurs.
   */
  async getCount(searchData: object): Promise<number | null> {
    try {
      const count = await UserModel.count({
        where: { ...searchData, deleted: false },
      });

      return count;
    } catch (error: any) {
      console.error('Error in getCount:', error.message);
      return null;
    }
  }
}
