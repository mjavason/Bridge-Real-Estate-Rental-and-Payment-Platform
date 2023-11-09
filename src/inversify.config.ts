import { Container } from 'inversify';
import { UserController, MailController } from './controllers';
import { TYPE, interfaces } from 'inversify-express-utils';
import { MailService, UserService } from './services';

const container = new Container();

container.bind<UserService>(UserService).toSelf();
container.bind<MailService>(MailService).toSelf();
container.bind<MailController>(MailController).toSelf();

// Bind controllers (ensure that you're binding each controller only once)
container.bind<interfaces.Controller>(UserController).to(UserController);

export default container;
