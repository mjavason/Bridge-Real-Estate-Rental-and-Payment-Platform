import 'reflect-metadata';
import 'express-async-errors';
import app from './app';
import logger from './helpers/logger';
import sequelize from './config/sequelize';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './inversify.config';
import { connectToRedisClient } from './config/redis';
// import handleRouteNotFound from './middleware/url_not_found.middleware';
// import { testConnection } from './config/sequelize';

// setting up server
const PORT = process.env.PORT || 3000;

// Set up the Inversify server
const server = new InversifyExpressServer(container, null, { rootPath: '/api/v1' }, app);

// app.use(handleRouteNotFound);

server.build().listen(PORT, async () => {
  // await testConnection();
  await sequelize.sync();
  connectToRedisClient();
  logger.info(`Server running on port ${PORT}`);
});

export default server;
