import { Container } from 'inversify';
import { AuthController, MailController } from './controllers';
import { interfaces } from 'inversify-express-utils';
import { MailService, UserService } from './services';

const container = new Container();

//Bind Services/Injectables
container.bind<UserService>(UserService).toSelf();
container.bind<MailService>(MailService).toSelf();
container.bind<MailController>(MailController).toSelf();

// Bind Controllers
container.bind<interfaces.Controller>(AuthController).to(AuthController);

export default container;
