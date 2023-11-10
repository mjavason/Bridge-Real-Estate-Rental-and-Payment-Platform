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
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get the profile of the authenticated user.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /user/{pagination}:
 *   get:
 *     summary: Get a paginated list of users
 *     description: Get a paginated list of users with a specified page number.
 *     tags: [User]
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
 *         description: Paginated list of users retrieved successfully.
 *       '404':
 *         description: No users found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /user/exists:
 *   get:
 *     summary: Check if a user exists
 *     description: Check if a user exists based on query parameters.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         description: The ID of the user.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: firstName
 *         description: The first name of the user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: The last name of the user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         description: The email of the user.
 *         schema:
 *           type: string
 *           format: email
 *       - in: query
 *         name: role
 *         description: The role of the user.
 *         schema:
 *           type: string
 *           enum: ['client', 'admin', 'landlord']
 *       - in: query
 *         name: accountBalance
 *         description: The account balance of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User exists.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /user/count:
 *   get:
 *     summary: Get user count
 *     description: Get the count of users based on query parameters.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         description: The ID of the user.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: firstName
 *         description: The first name of the user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: The last name of the user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         description: The email of the user.
 *         schema:
 *           type: string
 *           format: email
 *       - in: query
 *         name: role
 *         description: The role of the user.
 *         schema:
 *           type: string
 *           enum: ['client', 'admin', 'landlord']
 *       - in: query
 *         name: accountBalance
 *         description: The account balance of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User count retrieved successfully.
 *       '404':
 *         description: No users found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Find users
 *     description: Find users based on query parameters.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         description: The ID of the user.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: firstName
 *         description: The first name of the user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: The last name of the user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         description: The email of the user.
 *         schema:
 *           type: string
 *           format: email
 *       - in: query
 *         name: role
 *         description: The role of the user.
 *         schema:
 *           type: string
 *           enum: ['client', 'admin', 'landlord']
 *       - in: query
 *         name: accountBalance
 *         description: The account balance of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Users retrieved successfully.
 *       '404':
 *         description: No users found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Update authenticated users profile
 *     description: Update logged in user based on the provided data.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User update data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Soft delete authenticated user
 *     description: Soft delete authenticated user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User soft deleted successfully.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /user/hard/{id}:
 *   delete:
 *     summary: Hard delete a user
 *     description: Hard delete a user based on the provided ID. (Admins only)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the user.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User hard deleted successfully.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User does not have admin privileges.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDTO:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         lastName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         email:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         role:
 *           type: string
 *           enum: [client, admin, landlord]
 *         accountBalance:
 *           type: number
 *         password:
 *           type: string
 *           minLength: 5
 *
 *     UpdateUserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         firstName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         lastName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         email:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         role:
 *           type: string
 *           enum: [ admin, client, landlord]
 *         accountBalance:
 *           type: number
 *         password:
 *           type: string
 *           minLength: 5
 *         deleted:
 *           type: boolean
 *
 *     FindUserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         firstName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         lastName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         email:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         role:
 *           type: string
 *           enum: [client, admin, landlord]
 *         accountBalance:
 *           type: number
 */
