import login from '../../application/use_cases/auth/login';
import forgotPasswor from '../../application/use_cases/auth/forgotPasswor';
import catchAsync from '../../untils/catchAsync';

export default function authController(userDbRepository, userDbRepositoryImpl, authServiceInterface, authServiceImpl) {
    const dbRepository = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());

    const loginUser = (req, res, next) => {
        const { email, password } = req.body;
        login(email, password, dbRepository, authService)
            .then((token) => res.json(token))
            .catch((err) => next(err));
    };

    const logoutUser = (req, res, next) => {
        const { refreshToken } = req.body;
    };

    const forgotPasswordUser = async (req, res, next) => {
        const { email } = req.body;
        await forgotPasswor(email, dbRepository)
            .then((token) => res.json(token))
            .catch((err) => next(err));
    };

    return {
        loginUser,
        logoutUser,
        forgotPasswordUser,
    };
}
