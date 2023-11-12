/**
 * @swagger
 * tags:
 *   name: Bid
 *   description: Operations related to bids
 */

/**
 * @swagger
 * /bid:
 *   post:
 *     summary: Create a new bid
 *     description: Create a new bid with the provided data.
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Bid creation data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBidDTO'
 *     responses:
 *       '200':
 *         description: Bid created successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /bid/{id}/pay:
 *   post:
 *     summary: Pay for a house through a bid
 *     description: Initiate payment for the specified bid.
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the bid to pay for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Payment successful.
 *       '400':
 *         description: Bad request.
 *       '404':
 *         description: Bid not found.
 *       '401':
 *         description: Unauthorized - Missing or invalid token.
 */



/**
 * @swagger
 * /bid/exists:
 *   get:
 *     summary: Check if a bid exists
 *     description: Check if a bid exists based on query parameters.
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for checking bid existence.
 *         schema:
 *           $ref: '#/components/schemas/FindBidDTO'
 *     responses:
 *       '200':
 *         description: Bid exists.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /bid/count:
 *   get:
 *     summary: Get the count of bids
 *     description: Get the total count of bids based on query parameters.
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for getting the count of bids.
 *         schema:
 *           $ref: '#/components/schemas/FindBidDTO'
 *     responses:
 *       '200':
 *         description: Count of bids retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /bid/search:
 *   get:
 *     summary: Search for bids
 *     description: Search for bids based on query parameters.
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for searching bids.
 *         schema:
 *           $ref: '#/components/schemas/FindBidDTO'
 *     responses:
 *       '200':
 *         description: Bids retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /bid/{pagination}:
 *   get:
 *     summary: Get all bids with pagination
 *     description: Get a paginated list of all bids.
 *     tags: [Bid]
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
 *         description: List of bids retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /bid/{id}:
 *   patch:
 *     summary: Update a bid
 *     description: Update a bid with the provided data.
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the bid to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Bid update data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBidDTO'
 *     responses:
 *       '200':
 *         description: Bid updated successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /bid/{id}:
 *   delete:
 *     summary: Delete a bid
 *     description: Delete a bid by ID (soft delete).
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the bid to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Bid deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /bid/hard/{id}:
 *   delete:
 *     summary: Hard delete a bid (Admins only)
 *     description: Hard delete a bid by ID (Admins only).
 *     tags: [Bid]
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the bid to hard delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Bid hard deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateBidDTO:
 *       type: object
 *       properties:
 *         HouseId:
 *           type: number
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *
 *     UpdateBidDTO:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         deleted:
 *           type: boolean
 *
 *     FindBidDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         HouseId:
 *           type: number
 *         UserId:
 *           type: number
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 */
