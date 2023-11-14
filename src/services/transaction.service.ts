import TransactionModel from '../models/transaction.model';
import ITransaction from '../interfaces/transaction.interface';
import { injectable } from 'inversify';

/**
 * Service class for transaction-related operations.
 */
@injectable()
export class TransactionService {
  /**
   * Create a new transaction.
   *
   * @param {ITransaction} body - Transaction data.
   * @returns {Promise<ITransaction|null>} The created transaction or null on error.
   */
  async create(body: ITransaction) {
    try {
      const transaction = await TransactionModel.create(body);
      return transaction.get();
    } catch (error: any) {
      console.error('Error in create:', error.message);
      return null;
    }
  }

  /**
   * Get a list of transactions.
   *
   * @param {number} pagination - Offset for pagination.
   * @returns {Promise<ITransaction[]|null>} An array of transactions or null on error.
   */
  async getAll(pagination: number = 0) {
    try {
      const transactions = await TransactionModel.findAll({
        where: { deleted: false },
        limit: 10,
        offset: pagination,
        order: [['createdAt', 'DESC']],
      });
      return transactions.map((transaction) => transaction.get());
    } catch (error: any) {
      console.error('Error in getAll:', error.message);
      return null;
    }
  }

  /**
   * Update a transaction's information.
   *
   * @param {Partial<ITransaction>} searchDetails - Search criteria.
   * @param {Partial<ITransaction>} update - Updated transaction data.
   * @returns {Promise<ITransaction|null>} The updated transaction or null if the transaction is not found or on error.
   */
  async update(searchDetails: Partial<ITransaction>, update: Partial<ITransaction>) {
    try {
      const transaction = await TransactionModel.findOne({
        where: { ...searchDetails, deleted: false },
      });

      if (transaction) {
        await transaction.update(update);
        return transaction.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in update:', error.message);
      return null;
    }
  }

  /**
   * Find transactions based on search criteria.
   *
   * @param {Partial<ITransaction>} searchData - Search criteria.
   * @returns {Promise<ITransaction[]|null>} An array of transactions matching the search criteria or null on error.
   */
  async find(searchData: Partial<ITransaction>) {
    try {
      const transactions = await TransactionModel.findAll({
        where: { ...searchData, deleted: false },
      });
      return transactions.map((transaction) => transaction.get());
    } catch (error: any) {
      console.error('Error in find:', error.message);
      return null;
    }
  }

  /**
   * Find a transaction based on search criteria.
   *
   * @param {Partial<ITransaction>} searchData - Search criteria.
   * @returns {Promise<ITransaction|null>} The transaction matching the search criteria or null if not found or on error.
   */
  async findOne(searchData: Partial<ITransaction>) {
    try {
      const transaction = await TransactionModel.findOne({
        where: { ...searchData, deleted: false },
      });

      if (transaction) {
        return transaction.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in findOne:', error.message);
      return null;
    }
  }

  /**
   * Soft delete a transaction based on search criteria.
   *
   * @param {Partial<ITransaction>} searchParams - Search criteria for the transaction to delete.
   * @returns {Promise<ITransaction|null>} The deleted transaction or null if not found or on error.
   */
  async softDelete(searchParams: Partial<ITransaction>) {
    try {
      const transaction = await TransactionModel.findOne({
        where: { ...searchParams, deleted: false },
      });

      if (transaction) {
        await transaction.update({ deleted: true });
        return transaction.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in softDelete:', error.message);
      return null;
    }
  }

  /**
   * Hard delete a transaction based on search criteria.
   *
   * @param {Partial<ITransaction>} searchParams - Search criteria for the transaction to delete.
   * @returns {Promise<ITransaction|null>} The deleted transaction or null if not found or on error.
   */
  async hardDelete(searchParams: Partial<ITransaction>) {
    try {
      const transaction = await TransactionModel.findOne({
        where: searchParams,
      });

      if (transaction) {
        await transaction.destroy();
        return transaction.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in hardDelete:', error.message);
      return null;
    }
  }

  /**
   * Check if a transaction with the given search parameters exists.
   *
   * @param {Partial<ITransaction>} searchParams - Search criteria to check for the transaction's existence.
   * @returns {Promise<boolean|null>} True if the transaction exists, false if not found, or null on error.
   */
  async exists(searchParams: Partial<ITransaction>) {
    try {
      const transaction = await TransactionModel.findOne({ where: searchParams });
      return !!transaction;
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
      const count = await TransactionModel.count({
        where: { ...searchData, deleted: false },
      });

      return count;
    } catch (error: any) {
      console.error('Error in getCount:', error.message);
      return null;
    }
  }
}
