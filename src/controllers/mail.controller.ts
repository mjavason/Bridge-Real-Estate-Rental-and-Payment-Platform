import { MailService, UserService } from '../services';
import { APP_NAME, SITE_LINK } from '../constants';
import { inject, injectable } from 'inversify';

@injectable()
export class MailController {
  constructor(
    @inject(UserService) private userService: UserService,
    @inject(MailService) private mailService: MailService,
  ) {}

  async sendWelcomeMail(email: string, firstName: string, lastName: string, token: string) {
    // Load the email template
    const templatePath = 'src/templates/welcome.html';

    const confirmationLink = `${SITE_LINK}/api/v1/auth/welcome/${token}`;

    // Replace placeholders with actual data
    const data = {
      firstName: firstName,
      lastName: lastName,
      confirmationLink: confirmationLink,
    };
    // Compile the template
    const compiledTemplate = await this.mailService.renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    const info = await this.mailService.sendMail(email, compiledTemplate, `${APP_NAME} Welcome`);

    console.log(`Welcome email sent to: ${email}`);

    return { info };
  }

  // Send the reset email
  async sendPasswordResetEmail(email: string, token: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      console.log(`User with email: ${email} does not exist`);
      return false;
    }

    const resetLink = `${SITE_LINK}/api/v1/auth/reset-password/${token}`;
    const data = {
      email: email,
      passwordResetLink: resetLink,
    };

    const renderedEmail = await this.mailService.renderMailTemplate(
      'src/templates/password_reset.html',
      data,
    );

    if (!renderedEmail) {
      console.log('Mail template not found');
      return false;
    }

    // Send the email
    const info = await this.mailService.sendMail(email, renderedEmail, 'Password reset');

    console.log(`Password reset email sent to: ${email}`);

    return { info };
  }

  async sendMagicLinkEmail(email: string, token: string) {
    // Load the email template
    const templatePath = 'src/templates/magic_link.html';

    const magicLink = `${SITE_LINK}/api/v1/auth/magic/${token}`;

    // Replace placeholders with actual data
    const data = {
      magicLink: magicLink,
    };
    // Compile the template
    const compiledTemplate = await this.mailService.renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    const info = await this.mailService.sendMail(email, compiledTemplate, `${APP_NAME}`);

    console.log(`Magic link email sent to: ${email}`);

    return { info };
  }

  async sendBidUpdateMail(
    tenantEmail: string,
    landlordEmail: string,
    houseTitle: string,
    bidStatus: string,
  ) {
    // Load the email template
    const templatePath = 'src/templates/bid.html';

    // Replace placeholders with actual data
    const data = {
      bidStatus,
      houseTitle,
    };

    // Compile the template
    const compiledTemplate = await this.mailService.renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    const info = await this.mailService.sendMail(
      tenantEmail,
      compiledTemplate,
      `${APP_NAME} Bid Status Update`,
    );

    const info2 = await this.mailService.sendMail(
      landlordEmail,
      compiledTemplate,
      `${APP_NAME} Bid Status Update`,
    );

    console.log(`Bid status update email sent to: ${landlordEmail} and ${tenantEmail}`);

    return { info, info2 };
  }

  async sendBidCreatedMail(
    tenantEmail: string,
    landlordEmail: string,
    houseTitle: string,
    bidStatus: string,
  ) {
    // Load the email template
    const templatePath = 'src/templates/bid_created.html';

    // Replace placeholders with actual data
    const data = {
      bidStatus,
      houseTitle,
    };

    // Compile the template
    const compiledTemplate = await this.mailService.renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    const info = await this.mailService.sendMail(
      tenantEmail,
      compiledTemplate,
      `${APP_NAME} Bid Created`,
    );

    const info2 = await this.mailService.sendMail(
      landlordEmail,
      compiledTemplate,
      `${APP_NAME} Bid Created`,
    );

    console.log(`Bid created email sent to: ${landlordEmail} and ${tenantEmail}`);

    return { info, info2 };
  }
}
