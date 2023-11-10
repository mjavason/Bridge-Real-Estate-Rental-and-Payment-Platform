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
import { ACCESS_TOKEN_SECRET, JWT_SECRET, MESSAGES } from '../constants';
import { MailController } from './mail.controller';
import { controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserService } from '../services';
import { LoginDTO, RegisterUserDTO } from '../dto/auth.dto';
import { validateBodyDTO } from '../middleware/body.validation.middleware';

@controller('/auth')
export class AuthController {
  constructor(
    @inject(UserService) private userService: UserService,
    @inject(MailController) private mailController: MailController,
  ) {}

  @httpPost('/register', validateBodyDTO(RegisterUserDTO))
  async register(req: Request, res: Response) {
    const existingUser = await this.userService.findOne({ email: req.body.email });

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

    const token = await signJwt({ id: data.id }, JWT_SECRET, '1h');

    const sendMail = await this.mailController.sendWelcomeMail(
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      token,
    );

    if (!sendMail)
      return SuccessResponse(res, data, 'User registered successfully. Welcome mail failed');

    return SuccessResponse(res, data);
  }

  @httpPost('/login', validateBodyDTO(LoginDTO))
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // If valid cookie token still exists, inform the user theyre still logged in
    if (req.cookies.token) {
      if (await verifyJwt(req.cookies.token, ACCESS_TOKEN_SECRET))
        return SuccessMsgResponse(res, 'Already logged in');
    }

    // Find the user by email
    const user = await this.userService.findOneReturnPassword({ email });

    if (!user) return NotFoundResponse(res, 'User not found');

    try {
      // Compare the provided password with the stored hashed password
      const passwordMatch = bcrypt.compare(password, user.password);
      if (!passwordMatch) return ForbiddenResponse(res, 'Invalid password');
    } catch (error) {
      logger.error('Login failed', error);
      return InternalErrorResponse(res);
    }

    // Passwords match, user is authenticated
    const { id, role } = user;

    const magicLinkToken = await signJwt({ id, role, email }, JWT_SECRET, '3m');

    this.mailController.sendMagicLinkEmail(user.email, magicLinkToken);

    return SuccessMsgResponse(
      res,
      'We sent you a verification link to your email address. Click the link to sign-in on this device. Expires in 3 minutes',
    );
  }

  @httpGet('/magic/:token')
  async authorizeUserFromMagicLink(req: Request, res: Response) {
    const { token } = req.params;
    if (!token) return BadRequestResponse(res, 'Unauthorized! Invalid token');

    const decoded = await verifyJwt(token, JWT_SECRET);
    if (!decoded) return AccessTokenErrorResponse(res, 'Unauthorized! Invalid token');

    const { id, role, email } = decoded;

    const accessToken = await signJwt({ id, role, email }, ACCESS_TOKEN_SECRET, '48h');

    res.cookie('token', accessToken, { httpOnly: true });

    return SuccessMsgResponse(res, MESSAGES.LOGGED_IN);
  }

  @httpDelete('/logout')
  async logout(req: Request, res: Response) {
    const token = req.cookies.token;

    if (!token) return NotFoundResponse(res, 'No user logged in currently');

    res.clearCookie('token');

    return SuccessMsgResponse(res, 'Logged out successfully');
  }
}
