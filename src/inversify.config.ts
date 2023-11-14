import { Container } from 'inversify';
import {
  AuthController,
  GalleryController,
  HouseController,
  MailController,
  BidController,
} from './controllers';
import { interfaces } from 'inversify-express-utils';
import {
  BidService,
  MailService,
  UserService,
  HouseService,
  GalleryService,
  TransactionService,
} from './services';
import { TransactionController } from './controllers/transaction.controller';

const container = new Container();

//Bind Services/Injectables
container.bind<UserService>(UserService).toSelf();
container.bind<MailService>(MailService).toSelf();
container.bind<MailController>(MailController).toSelf();
container.bind<HouseService>(HouseService).toSelf();
container.bind<GalleryService>(GalleryService).toSelf();
container.bind<BidService>(BidService).toSelf();
container.bind<TransactionService>(TransactionService).toSelf();

// Bind Controllers
container.bind<interfaces.Controller>(AuthController).to(AuthController);
container.bind<interfaces.Controller>(HouseController).to(HouseController);
container.bind<interfaces.Controller>(GalleryController).to(GalleryController);
container.bind<interfaces.Controller>(BidController).to(BidController);
container.bind<interfaces.Controller>(TransactionController).to(TransactionController);

export default container;
