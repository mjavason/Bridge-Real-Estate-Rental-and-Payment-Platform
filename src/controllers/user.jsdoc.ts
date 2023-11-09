/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get logged in users' profile
 *     description: Retrieve logged in users info
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Data fetched successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Profile not found
 *     security:
 *       - bearerAuth: []  # Use the "bearerAuth" security definition
 */

/**
 *  @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
