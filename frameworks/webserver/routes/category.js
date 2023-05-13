import categoryRepositoryMongoDB from '../../database/mongoDB/repositories/categoryRepositoryMongoDB';
import categoryDbRepository from '../../../application/repositories/categoryDbRepository';
import categoryRedisRepositoryImpl from '../../database/redis/categoryRepositoryRedis';
import redisCachingMiddleware from '../middlewares/redisCachingMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import categoryController from '../../../adapters/controllers/categoryController';

export default function postRouter(express, redisClient) {
    const router = express.Router();

    // load controller with dependencies
    const controller = categoryController(
        categoryDbRepository,
        categoryRepositoryMongoDB,
        redisClient,
        categoryDbRepository,
        categoryRedisRepositoryImpl,
    );

    // GET endpoints
    router
        .route('/')
        .get([authMiddleware, redisCachingMiddleware(redisClient, 'category')], controller.fetchAllCategory);
    router
        .route('/:id')
        .get([authMiddleware, redisCachingMiddleware(redisClient, 'category')], controller.fetchCategoryById);

    // POST endpoints
    router.route('/create').post(authMiddleware, controller.addNewCategorys);

    // PUT endpoints
    router.route('/:id').put(authMiddleware, controller.updateCategoryById);

    // DELETE endpoints
    router.route('/:id').delete(authMiddleware, controller.deleteCategorysById);

    return router;
}
