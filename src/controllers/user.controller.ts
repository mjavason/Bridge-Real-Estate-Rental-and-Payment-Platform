import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  NotFoundResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
  BadRequestResponse,
  AccessTokenErrorResponse,
} from '../helpers/response';
import logger from '../helpers/logger';
import { signJwt, verifyJwt } from '../utils/jwt';
import { ACCESS_TOKEN_SECRET, JWT_SECRET, MESSAGES, REFRESH_TOKEN_SECRET } from '../constants';
import { MailController } from './mail.controller';
import { controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserService } from '../services/user.service';

@controller('/auth')
export class UserController {
  constructor(
    @inject(UserService) private userService: UserService,
    @inject(MailController) private mailController: MailController,
  ) {}

  @httpGet('/')
  async getAllUsers(req: Request, res: Response) {
    const data = await this.userService.getAll();

    if (!data) return InternalErrorResponse(res);

    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  @httpPost('/register')
  async register(req: Request, res: Response) {
    let existingUser = await this.userService.findOne({ email: req.body.email });

    //Hash password
    try {
      const hashedPassword = await this.userService.hashPassword(req.body.password);
      req.body.password = hashedPassword;
    } catch (error) {
      logger.error('Password hash failed');
      console.log(error);
      return InternalErrorResponse(res);
    }

    if (existingUser) return ForbiddenResponse(res, 'User already exists');
    const data = await this.userService.create(req.body);

    if (!data) return InternalErrorResponse(res);

    let token = await signJwt({ id: data.id }, JWT_SECRET, '1h');

    let sendMail = await this.mailController.sendWelcomeMail(
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      token,
    );

    if (!sendMail)
      return SuccessResponse(res, data, 'User registered successfully. Welcome mail failed');

    return SuccessResponse(res, data);
  }

  @httpPost('/login')
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Find the user by email
    const user = await this.userService.findOneReturnPassword({ email });

    if (!user) return NotFoundResponse(res, 'User not found');

    try {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return ForbiddenResponse(res, 'Invalid password');
    } catch (error) {
      logger.error('Login failed', error);
      return InternalErrorResponse(res);
    }

    // Passwords match, user is authenticated
    const { id, role } = user;

    let magicLinkToken = await signJwt({ id, role, email }, JWT_SECRET, '3m');

    this.mailController.sendMagicLinkEmail(user.email, magicLinkToken);

    return SuccessMsgResponse(
      res,
      'We sent you a verification link to your email address. Click the link to sign-in on this device. Expires in 3 minutes',
    );
  }

  async authorizeUserFromMagicLink(req: Request, res: Response) {
    const { token } = req.params;
    if (!token) return BadRequestResponse(res, 'Unauthorized! Invalid token');

    const decoded = await verifyJwt(token, JWT_SECRET);
    if (!decoded) return AccessTokenErrorResponse(res, 'Unauthorized! Invalid token');

    const { id, role, email } = decoded;

    let accessToken = await signJwt({ id, role, email }, ACCESS_TOKEN_SECRET, '48h');

    res.cookie('token', accessToken, { httpOnly: true });

    return SuccessMsgResponse(res, MESSAGES.LOGGED_IN);
  }

  // async resetPasswordMail(req: Request, res: Response) {
  //   const { email } = req.body;

  //   // Find the user by email
  //   const user = await this.userService.findOne({ email });

  //   if (!user) return NotFoundResponse(res, 'User not found');

  //   // Generate a unique reset token
  //   const token = crypto.randomBytes(32).toString('hex');

  //   // Set the expiration date to 1 hour from now
  //   const expiresAt = new Date();
  //   expiresAt.setHours(expiresAt.getHours() + 1);

  //   // Save the reset token to the database
  //   const resetToken = await resetTokenService.create({ user: user.id, token, expiresAt });

  //   // Send the password reset email
  //   let mailSent = await mailController.sendPasswordResetEmail(email, token);

  //   if (!mailSent) return InternalErrorResponse(res, 'Error sending password reset email');

  //   return SuccessMsgResponse(res, 'Password reset email sent successfully');
  // }

  // async resetPassword(req: Request, res: Response) {
  //   const { token } = req.params;
  //   const { newPassword } = req.body;

  //   // Find the reset token in the database
  //   const resetToken = await resetTokenService.findOne({ token });

  //   if (!resetToken || resetToken.expiresAt < new Date())
  //     return ForbiddenResponse(res, 'Invalid or expired token');

  //   // Find the associated user and update their password
  //   const user = await this.userService.findOne({ user: resetToken.user });

  //   if (!user) return res.status(404).json({ message: 'User not found' });

  //   let hashedPassword = await hashPassword(newPassword);
  //   let updatedUser = await this.userService.update({ id: user.id }, { password: hashedPassword });

  //   if (!updatedUser) return InternalErrorResponse(res, 'Unable to update password');

  //   // Delete the used reset token
  //   let usedToken = await resetTokenService.softDelete({ id: resetToken.id });

  //   if (!usedToken) return InternalErrorResponse(res, 'Unable to delete token');

  //   return SuccessMsgResponse(res, 'Password reset successful');
  // }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.userService.update({ id: id }, req.body);

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.UPDATED);
  }

  @httpDelete('/logout')
  async logout(req: Request, res: Response) {
    const token = req.cookies.token;

    if (!token) return NotFoundResponse(res, 'No user logged in currently');

    res.clearCookie('token');

    return SuccessMsgResponse(res, 'Logged out successfully');
  }
}
