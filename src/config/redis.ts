import { createClient } from 'redis';
import { REDIS_URL } from '../constants';

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export async function connectToRedisClient() {
  try {
    await redisClient.connect();
  } catch (error: any) {
    console.log(error.message);
    return;
  }
}

export default redisClient;
