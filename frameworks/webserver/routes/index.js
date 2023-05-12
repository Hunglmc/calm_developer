import postRouter from './post';
import userRouter from './user';
import authRouter from './auth';
import categoryRouter from './category';

export default function routes(app, express, redisClient) {
    app.use('/api/v1/posts', postRouter(express, redisClient));
    app.use('/api/v1/users', userRouter(express, redisClient));
    app.use('/api/v1', authRouter(express, redisClient));
    app.use('/api/v1/category', categoryRouter(express, redisClient));
}
