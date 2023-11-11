/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided data.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User creation data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       '200':
 *         description: User created successfully.
 *       '400':
 *         description: Bad request.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /house:
 *   post:
 *     summary: Create a new house
 *     description: Create a new house with the provided data.
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: House creation data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHouseDTO'
 *     responses:
 *       '200':
 *         description: House created successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/{pagination}:
 *   get:
 *     summary: Get all houses with pagination
 *     description: Get a paginated list of all houses.
 *     tags: [House]
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
 *         description: List of houses retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/exists:
 *   get:
 *     summary: Check if a house exists
 *     description: Check if a house exists based on query parameters.
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for checking house existence.
 *         schema:
 *           $ref: '#/components/schemas/FindHouseDTO'
 *     responses:
 *       '200':
 *         description: House exists.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/count:
 *   get:
 *     summary: Get the count of houses
 *     description: Get the total count of houses based on query parameters.
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for getting the count of houses.
 *         schema:
 *           $ref: '#/components/schemas/FindHouseDTO'
 *     responses:
 *       '200':
 *         description: Count of houses retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/search:
 *   get:
 *     summary: Search for houses
 *     description: Search for houses based on query parameters.
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for searching houses.
 *         schema:
 *           $ref: '#/components/schemas/FindHouseDTO'
 *     responses:
 *       '200':
 *         description: Houses retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/{id}:
 *   get:
 *     summary: Find a house by ID
 *     description: Find a house by ID based on query parameters.
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parameters
 *         description: Query parameters for finding a house by ID.
 *         schema:
 *           $ref: '#/components/schemas/FindHouseDTO'
 *       - in: path
 *         name: id
 *         description: The ID of the house to find.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: House retrieved successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/{id}:
 *   patch:
 *     summary: Update a house
 *     description: Update a house with the provided data.
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the house to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: House update data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHouseDTO'
 *     responses:
 *       '200':
 *         description: House updated successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/{id}:
 *   delete:
 *     summary: Delete a house
 *     description: Delete a house by ID (soft delete).
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the house to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: House deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /house/hard/{id}:
 *   delete:
 *     summary: Hard delete a house (Admins only)
 *     description: Hard delete a house by ID (Admins only).
 *     tags: [House]
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the house to hard delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: House hard deleted successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateHouseDTO:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         description:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         price:
 *           type: number
 *         location:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         numberOfRooms:
 *           type: number
 *         amenities:
 *           type: string
 *
 *     UpdateHouseDTO:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         description:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         price:
 *           type: number
 *         location:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         numberOfRooms:
 *           type: number
 *         amenities:
 *           type: string
 *         deleted:
 *           type: boolean
 *
 *     FindHouseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         description:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         price:
 *           type: number
 *         location:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         numberOfRooms:
 *           type: number
 *         amenities:
 *           type: string
 *         UserId:
 *           type: number
 */
