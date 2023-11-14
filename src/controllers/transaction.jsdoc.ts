/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Operations related to transaction entries
 */

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a new transaction entry
 *     description: Create a new transaction entry with the provided data.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Transaction creation data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionDTO'
 *     responses:
 *       '200':
 *         description: Transaction entry created successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /transaction/exists:
 *   get:
 *     summary: Check if a transaction entry exists
 *     description: Check if a transaction entry exists based on query parameters.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for checking transaction entry existence.
 *         schema:
 *           $ref: '#/components/schemas/FindTransactionDTO'
 *     responses:
 *       '200':
 *         description: Transaction entry exists.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /transaction/count:
 *   get:
 *     summary: Get the count of transaction entries
 *     description: Get the total count of transaction entries based on query parameters.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for getting the count of transaction entries.
 *         schema:
 *           $ref: '#/components/schemas/FindTransactionDTO'
 *     responses:
 *       '200':
 *         description: Count of transaction entries retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /transaction/{pagination}:
 *   get:
 *     summary: Get all transaction entries with pagination
 *     description: Get a paginated list of all transaction entries.
 *     tags: [Transaction]
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
 *         description: List of transaction entries retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /transaction/search:
 *   get:
 *     summary: Search for transactions
 *     description: Search for transactions based on query parameters.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for searching transactions.
 *         schema:
 *           $ref: '#/components/schemas/FindTransactionDTO'
 *     responses:
 *       '200':
 *         description: Transactions retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /transaction/{id}:
 *   patch:
 *     summary: Update a transaction entry
 *     description: Update a transaction entry with the provided data.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the transaction entry to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Transaction update data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransactionDTO'
 *     responses:
 *       '200':
 *         description: Transaction entry updated successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Delete a transaction entry
 *     description: Delete a transaction entry by ID (soft delete).
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the transaction entry to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Transaction entry deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /transaction/hard/{id}:
 *   delete:
 *     summary: Hard delete a transaction entry (Admins only)
 *     description: Hard delete a transaction entry by ID (Admins only).
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the transaction entry to hard delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Transaction entry hard deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTransactionDTO:
 *       type: object
 *       properties:
 *         senderId:
 *           type: number
 *         recipientId:
 *           type: number
 *
 *     UpdateTransactionDTO:
 *       type: object
 *       properties:
 *         senderId:
 *           type: number
 *         recipientId:
 *           type: number
 *         deleted:
 *           type: boolean
 *
 *     FindTransactionDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         senderId:
 *           type: number
 *         recipientId:
 *           type: number
 */
