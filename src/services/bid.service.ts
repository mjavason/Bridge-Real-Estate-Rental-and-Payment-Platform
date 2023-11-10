import BidModel from '../models/bid.model';
import IBid from '../interfaces/bid.interface';
import { injectable } from 'inversify';

/**
 * Service class for bid-related operations.
 */
@injectable()
export class BidService {
  /**
   * Create a new bid.
   *
   * @param {IBid} body - Bid data.
   * @returns {Promise<IBid|null>} The created bid or null on error.
   */
  async create(body: IBid) {
    try {
      const bid = await BidModel.create(body);
      return bid.get();
    } catch (error: any) {
      console.error('Error in create:', error.message);
      return null;
    }
  }

  /**
   * Get a list of bids.
   *
   * @param {number} pagination - Offset for pagination.
   * @returns {Promise<IBid[]|null>} An array of bids or null on error.
   */
  async getAll(pagination: number = 0) {
    try {
      const bids = await BidModel.findAll({
        where: { deleted: false },
        limit: 10,
        offset: pagination,
        order: [['createdAt', 'DESC']],
      });
      return bids.map((bid) => bid.get());
    } catch (error: any) {
      console.error('Error in getAll:', error.message);
      return null;
    }
  }

  /**
   * Update a bid's information.
   *
   * @param {Partial<IBid>} searchDetails - Search criteria.
   * @param {Partial<IBid>} update - Updated bid data.
   * @returns {Promise<IBid|null>} The updated bid or null if the bid is not found or on error.
   */
  async update(searchDetails: Partial<IBid>, update: Partial<IBid>) {
    try {
      const bid = await BidModel.findOne({
        where: { ...searchDetails, deleted: false },
      });

      if (bid) {
        await bid.update(update);
        return bid.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in update:', error.message);
      return null;
    }
  }

  /**
   * Find bids based on search criteria.
   *
   * @param {Partial<IBid>} searchData - Search criteria.
   * @returns {Promise<IBid[]|null>} An array of bids matching the search criteria or null on error.
   */
  async find(searchData: Partial<IBid>) {
    try {
      const bids = await BidModel.findAll({
        where: { ...searchData, deleted: false },
      });
      return bids.map((bid) => bid.get());
    } catch (error: any) {
      console.error('Error in find:', error.message);
      return null;
    }
  }

  /**
   * Find a bid based on search criteria.
   *
   * @param {Partial<IBid>} searchData - Search criteria.
   * @returns {Promise<IBid|null>} The bid matching the search criteria or null if not found or on error.
   */
  async findOne(searchData: Partial<IBid>) {
    try {
      const bid = await BidModel.findOne({
        where: { ...searchData, deleted: false },
      });

      if (bid) {
        return bid.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in findOne:', error.message);
      return null;
    }
  }

  /**
   * Soft delete a bid based on search criteria.
   *
   * @param {Partial<IBid>} searchParams - Search criteria for the bid to delete.
   * @returns {Promise<IBid|null>} The deleted bid or null if not found or on error.
   */
  async softDelete(searchParams: Partial<IBid>) {
    try {
      const bid = await BidModel.findOne({
        where: { ...searchParams, deleted: false },
      });

      if (bid) {
        await bid.update({ deleted: true });
        return bid.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in softDelete:', error.message);
      return null;
    }
  }

  /**
   * Hard delete a bid based on search criteria.
   *
   * @param {Partial<IBid>} searchParams - Search criteria for the bid to delete.
   * @returns {Promise<IBid|null>} The deleted bid or null if not found or on error.
   */
  async hardDelete(searchParams: Partial<IBid>) {
    try {
      const bid = await BidModel.findOne({
        where: searchParams,
      });

      if (bid) {
        await bid.destroy();
        return bid.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in hardDelete:', error.message);
      return null;
    }
  }

  /**
   * Check if a bid with the given search parameters exists.
   *
   * @param {Partial<IBid>} searchParams - Search criteria to check for the bid's existence.
   * @returns {Promise<boolean|null>} True if the bid exists, false if not found, or null on error.
   */
  async exists(searchParams: Partial<IBid>) {
    try {
      const bid = await BidModel.findOne({ where: searchParams });
      return !!bid;
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
      const count = await BidModel.count({
        where: { ...searchData, deleted: false },
      });

      return count;
    } catch (error: any) {
      console.error('Error in getCount:', error.message);
      return null;
    }
  }
}
