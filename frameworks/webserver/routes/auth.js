import authController from '../../../adapters/controllers/authController';
import userDbRepository from '../../../application/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import authServiceInterface from '../../../application/services/authService';
import authServiceImpl from '../../services/authService';

export default function authRouter(express) {
    const router = express.Router();

    // load controller with dependencies
    const controller = authController(userDbRepository, userDbRepositoryMongoDB, authServiceInterface, authServiceImpl);
    // POST enpdpoints
    router.route('/login').post(controller.loginUser);
    router.route('/forgot-password').post(controller.forgotPasswordUser);
    router.route('/logout').post(controller.logoutUser);
    return router;
}
