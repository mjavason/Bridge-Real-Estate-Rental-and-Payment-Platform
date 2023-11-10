/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Operations related to gallery entries
 */

/**
 * @swagger
 * /gallery:
 *   post:
 *     summary: Create a new gallery entry
 *     description: Create a new gallery entry with the provided data.
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Gallery creation data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGalleryDTO'
 *     responses:
 *       '200':
 *         description: Gallery entry created successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /gallery/exists:
 *   get:
 *     summary: Check if a gallery entry exists
 *     description: Check if a gallery entry exists based on query parameters.
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for checking gallery entry existence.
 *         schema:
 *           $ref: '#/components/schemas/FindGalleryDTO'
 *     responses:
 *       '200':
 *         description: Gallery entry exists.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /gallery/count:
 *   get:
 *     summary: Get the count of gallery entries
 *     description: Get the total count of gallery entries based on query parameters.
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for getting the count of gallery entries.
 *         schema:
 *           $ref: '#/components/schemas/FindGalleryDTO'
 *     responses:
 *       '200':
 *         description: Count of gallery entries retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /gallery:
 *   get:
 *     summary: Get all gallery entries
 *     description: Get a list of all gallery entries.
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of gallery entries retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /gallery/{pagination}:
 *   get:
 *     summary: Get all gallery entries with pagination
 *     description: Get a paginated list of all gallery entries.
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pagination
 *         description: The page number for pagination.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of gallery entries retrieved successfully.
 *       '400':
 *         description: Bad request.
 */


/**
 * @swagger
 * /gallery/search:
 *   get:
 *     summary: Search for galleries
 *     description: Search for galleries based on query parameters.
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for searching galleries.
 *         schema:
 *           $ref: '#/components/schemas/FindGalleryDTO'
 *     responses:
 *       '200':
 *         description: Galleries retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /gallery/{id}:
 *   patch:
 *     summary: Update a gallery entry
 *     description: Update a gallery entry with the provided data.
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the gallery entry to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Gallery update data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateGalleryDTO'
 *     responses:
 *       '200':
 *         description: Gallery entry updated successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /gallery/{id}:
 *   delete:
 *     summary: Delete a gallery entry
 *     description: Delete a gallery entry by ID (soft delete).
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the gallery entry to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Gallery entry deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /gallery/hard/{id}:
 *   delete:
 *     summary: Hard delete a gallery entry (Admins only)
 *     description: Hard delete a gallery entry by ID (Admins only).
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the gallery entry to hard delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Gallery entry hard deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateGalleryDTO:
 *       type: object
 *       properties:
 *         HouseId:
 *           type: number
 *         type:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         url:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *
 *     UpdateGalleryDTO:
 *       type: object
 *       properties:
 *         HouseId:
 *           type: number
 *         type:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         url:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *
 *     FindGalleryDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         HouseId:
 *           type: number
 *         type:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         url:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 */
