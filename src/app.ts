import express from 'express';
import preMiddleware from './middleware/pre.middleware';

const app = express();

preMiddleware(app);

export default app;
