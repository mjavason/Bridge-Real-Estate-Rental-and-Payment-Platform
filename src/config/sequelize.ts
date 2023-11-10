// sequelize.ts
import { Sequelize } from 'sequelize';
import {
  POSTGRES_DB_HOST,
  POSTGRES_DB_NAME,
  POSTGRES_DB_PASSWORD,
  POSTGRES_DB_USERNAME,
} from '../constants';

const sequelize = new Sequelize({
  dialect: 'postgres', // Choose your database dialect
  database: POSTGRES_DB_NAME,
  username: POSTGRES_DB_USERNAME,
  password: POSTGRES_DB_PASSWORD,
  host: POSTGRES_DB_HOST, // Database host
  port: 5432, // Database port
  logging: false,
});

// Test the connection
export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;
