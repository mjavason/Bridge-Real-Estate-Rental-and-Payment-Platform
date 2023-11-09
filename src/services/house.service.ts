import HouseModel from '../models/house.model';
import IHouse from '../interfaces/house.interface';
import bcrypt from 'bcrypt';
import { injectable } from 'inversify';

/**
 * Service class for house-related operations.
 */
@injectable()
export class HouseService {

  /**
   * Create a new house.
   *
   * @param {IHouse} body - House data.
   * @returns {Promise<IHouse|null>} The created house or null on error.
   */
  async create(body: IHouse) {
    try {
      const house = await HouseModel.create(body);
      return house.get();
    } catch (error: any) {
      console.error('Error in create:', error.message);
      return null;
    }
  }

  /**
   * Get a list of houses.
   *
   * @param {number} pagination - Offset for pagination.
   * @returns {Promise<IHouse[]|null>} An array of houses or null on error.
   */
  async getAll(pagination: number = 0) {
    try {
      const houses = await HouseModel.findAll({
        where: { deleted: false },
        limit: 10,
        offset: pagination,
        order: [['createdAt', 'DESC']],
      });
      return houses.map((house) => house.get());
    } catch (error: any) {
      console.error('Error in getAll:', error.message);
      return null;
    }
  }

  /**
   * Update a house's information.
   *
   * @param {Partial<IHouse>} searchDetails - Search criteria.
   * @param {Partial<IHouse>} update - Updated house data.
   * @returns {Promise<IHouse|null>} The updated house or null if the house is not found or on error.
   */
  async update(searchDetails: Partial<IHouse>, update: Partial<IHouse>) {
    try {
      const house = await HouseModel.findOne({
        where: { ...searchDetails, deleted: false },
      });

      if (house) {
        await house.update(update);
        return house.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in update:', error.message);
      return null;
    }
  }

  /**
   * Find houses based on search criteria.
   *
   * @param {Partial<IHouse>} searchData - Search criteria.
   * @returns {Promise<IHouse[]|null>} An array of houses matching the search criteria or null on error.
   */
  async find(searchData: Partial<IHouse>) {
    try {
      const houses = await HouseModel.findAll({
        where: { ...searchData, deleted: false },
      });
      return houses.map((house) => house.get());
    } catch (error: any) {
      console.error('Error in find:', error.message);
      return null;
    }
  }

  /**
   * Find a house based on search criteria.
   *
   * @param {Partial<IHouse>} searchData - Search criteria.
   * @returns {Promise<IHouse|null>} The house matching the search criteria or null if not found or on error.
   */
  async findOne(searchData: Partial<IHouse>) {
    try {
      const house = await HouseModel.findOne({
        where: { ...searchData, deleted: false },
      });

      if (house) {
        return house.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in findOne:', error.message);
      return null;
    }
  }


  /**
   * Soft delete a house based on search criteria.
   *
   * @param {Partial<IHouse>} searchParams - Search criteria for the house to delete.
   * @returns {Promise<IHouse|null>} The deleted house or null if not found or on error.
   */
  async softDelete(searchParams: Partial<IHouse>) {
    try {
      const house = await HouseModel.findOne({
        where: { ...searchParams, deleted: false },
      });

      if (house) {
        await house.update({ deleted: true });
        return house.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in softDelete:', error.message);
      return null;
    }
  }

  /**
   * Hard delete a house based on search criteria.
   *
   * @param {Partial<IHouse>} searchParams - Search criteria for the house to delete.
   * @returns {Promise<IHouse|null>} The deleted house or null if not found or on error.
   */
  async hardDelete(searchParams: Partial<IHouse>) {
    try {
      const house = await HouseModel.findOne({
        where: searchParams,
      });

      if (house) {
        await house.destroy();
        return house.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in hardDelete:', error.message);
      return null;
    }
  }

  /**
   * Check if a house with the given search parameters exists.
   *
   * @param {Partial<IHouse>} searchParams - Search criteria to check for the house's existence.
   * @returns {Promise<boolean|null>} True if the house exists, false if not found, or null on error.
   */
  async exists(searchParams: Partial<IHouse>) {
    try {
      const house = await HouseModel.findOne({ where: searchParams });
      return !!house;
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
  async count(searchData: object): Promise<number | null> {
    try {
      const count = await HouseModel.count({
        where: { ...searchData, deleted: false },
      });

      return count;
    } catch (error: any) {
      console.error('Error in getCount:', error.message);
      return null;
    }
  }
}
