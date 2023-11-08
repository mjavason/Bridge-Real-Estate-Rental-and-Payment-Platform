import { Server } from 'http';
import 'express-async-errors';
import app from './app';
import logger from './helpers/logger';
import { testConnection } from './config/sequelize';

// setting up server
const PORT = process.env.PORT || 5000;

const server: Server = app.listen(PORT, async () => {
  await testConnection();
  logger.info(`Server running on port ${PORT}`);
});

// handle unhanled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(err);

  // close server
  server.close(() => process.exit(1));
});

export default server;
