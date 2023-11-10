import GalleryModel from '../models/gallery.model';
import IGallery from '../interfaces/gallery.interface';
import { injectable } from 'inversify';

/**
 * Service class for gallery-related operations.
 */
@injectable()
export class GalleryService {
  /**
   * Create a new gallery.
   *
   * @param {IGallery} body - Gallery data.
   * @returns {Promise<IGallery|null>} The created gallery or null on error.
   */
  async create(body: IGallery) {
    try {
      const gallery = await GalleryModel.create(body);
      return gallery.get();
    } catch (error: any) {
      console.error('Error in create:', error.message);
      return null;
    }
  }

  /**
   * Get a list of gallerys.
   *
   * @param {number} pagination - Offset for pagination.
   * @returns {Promise<IGallery[]|null>} An array of gallerys or null on error.
   */
  async getAll(pagination: number = 0) {
    try {
      const gallerys = await GalleryModel.findAll({
        where: { deleted: false },
        limit: 10,
        offset: pagination,
        order: [['createdAt', 'DESC']],
      });
      return gallerys.map((gallery) => gallery.get());
    } catch (error: any) {
      console.error('Error in getAll:', error.message);
      return null;
    }
  }

  /**
   * Update a gallery's information.
   *
   * @param {Partial<IGallery>} searchDetails - Search criteria.
   * @param {Partial<IGallery>} update - Updated gallery data.
   * @returns {Promise<IGallery|null>} The updated gallery or null if the gallery is not found or on error.
   */
  async update(searchDetails: Partial<IGallery>, update: Partial<IGallery>) {
    try {
      const gallery = await GalleryModel.findOne({
        where: { ...searchDetails, deleted: false },
      });

      if (gallery) {
        await gallery.update(update);
        return gallery.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in update:', error.message);
      return null;
    }
  }

  /**
   * Find gallerys based on search criteria.
   *
   * @param {Partial<IGallery>} searchData - Search criteria.
   * @returns {Promise<IGallery[]|null>} An array of gallerys matching the search criteria or null on error.
   */
  async find(searchData: Partial<IGallery>) {
    try {
      const gallerys = await GalleryModel.findAll({
        where: { ...searchData, deleted: false },
      });
      return gallerys.map((gallery) => gallery.get());
    } catch (error: any) {
      console.error('Error in find:', error.message);
      return null;
    }
  }

  /**
   * Find a gallery based on search criteria.
   *
   * @param {Partial<IGallery>} searchData - Search criteria.
   * @returns {Promise<IGallery|null>} The gallery matching the search criteria or null if not found or on error.
   */
  async findOne(searchData: Partial<IGallery>) {
    try {
      const gallery = await GalleryModel.findOne({
        where: { ...searchData, deleted: false },
      });

      if (gallery) {
        return gallery.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in findOne:', error.message);
      return null;
    }
  }

  /**
   * Soft delete a gallery based on search criteria.
   *
   * @param {Partial<IGallery>} searchParams - Search criteria for the gallery to delete.
   * @returns {Promise<IGallery|null>} The deleted gallery or null if not found or on error.
   */
  async softDelete(searchParams: Partial<IGallery>) {
    try {
      const gallery = await GalleryModel.findOne({
        where: { ...searchParams, deleted: false },
      });

      if (gallery) {
        await gallery.update({ deleted: true });
        return gallery.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in softDelete:', error.message);
      return null;
    }
  }

  /**
   * Hard delete a gallery based on search criteria.
   *
   * @param {Partial<IGallery>} searchParams - Search criteria for the gallery to delete.
   * @returns {Promise<IGallery|null>} The deleted gallery or null if not found or on error.
   */
  async hardDelete(searchParams: Partial<IGallery>) {
    try {
      const gallery = await GalleryModel.findOne({
        where: searchParams,
      });

      if (gallery) {
        await gallery.destroy();
        return gallery.get();
      }

      return null;
    } catch (error: any) {
      console.error('Error in hardDelete:', error.message);
      return null;
    }
  }

  /**
   * Check if a gallery with the given search parameters exists.
   *
   * @param {Partial<IGallery>} searchParams - Search criteria to check for the gallery's existence.
   * @returns {Promise<boolean|null>} True if the gallery exists, false if not found, or null on error.
   */
  async exists(searchParams: Partial<IGallery>) {
    try {
      const gallery = await GalleryModel.findOne({ where: searchParams });
      return !!gallery;
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
      const count = await GalleryModel.count({
        where: { ...searchData, deleted: false },
      });

      return count;
    } catch (error: any) {
      console.error('Error in getCount:', error.message);
      return null;
    }
  }
}
