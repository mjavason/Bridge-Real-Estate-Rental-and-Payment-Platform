import nodeMailer from 'nodemailer';
import { MAIL_ADDRESS, MAIL_PASSWORD } from '../constants';
import fs from 'fs';
import handlebars from 'handlebars';
import logger from '../helpers/logger';
import { injectable } from 'inversify';

// Email account setup and login. You need to pass in your email credentials and use this app to control it.
const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ADDRESS,
    pass: MAIL_PASSWORD,
  },
});

@injectable()
export class MailService {
  sendMail = async (recipientEmail: string, mailHtmlBody: string, mailSubject: string) => {
    try {
      // This is where the actual email message is built. Things like CC, recipients, attachments, and so on are configured here.
      return await transporter.sendMail({
        from: `<${MAIL_ADDRESS}>`,
        to: recipientEmail,
        subject: mailSubject,
        html: mailHtmlBody,
      });
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  };

  async renderMailTemplate(templatePath: string, data: object) {
    try {
      // Load the email template
      // const templatePath = './email-templates/welcome-email.html';
      const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

      // Compile the template
      const compiledTemplate = handlebars.compile(emailTemplate);
      return compiledTemplate(data);
    } catch (e) {
      logger.error('Error compiling template');
      console.log(e);
      return false;
    }
  }
}
