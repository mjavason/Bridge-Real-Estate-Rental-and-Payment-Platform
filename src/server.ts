import { Server } from 'http';
import 'express-async-errors';
import app from './app';
import logger from './helpers/logger';
import sequelize from './config/sequelize';
// import { testConnection } from './config/sequelize';

// setting up server
const PORT = process.env.PORT || 3000;

const server: Server = app.listen(PORT, async () => {
  // await testConnection();
  await sequelize.sync();
  logger.info(`Server running on port ${PORT}`);
});

// handle unhanled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(err);

  // close server
  server.close(() => process.exit(1));
});

export default server;
