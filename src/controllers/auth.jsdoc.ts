/**
 * @swagger
 * /auth/magic/{token}:
 *   get:
 *     summary: Authenticate with a Magic Link
 *     description: Log the user in using a valid authentication token provided via a Magic Link.
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         description: The Magic Link authentication token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Magic Link Authentication successful. User logged in.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided data.
 *     tags: [Authentication]
 *     requestBody:
 *       description: User registration data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterSchema'
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate and log in a user.
 *     tags: [Authentication]
 *     requestBody:
 *       description: User login data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       '200':
 *         description: User logged in successfully. Magic link sent to email.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout user
 *     description: Delete the user token and log them out.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: User logged out successfully.
 *       '400':
 *         description: Bad request.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterSchema:
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
 *           enum: ['user', 'admin']
 *         password:
 *           type: string
 *           minLength: 5
 *
 *     LoginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         password:
 *           type: string
 *           minLength: 5
 */
