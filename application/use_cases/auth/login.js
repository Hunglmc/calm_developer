export default function login(email, password, userRepository, authService) {
    if (!email || !password) {
        const error = new Error('email and password fields cannot be empty');
        error.statusCode = 401;
        throw error;
    }
    return userRepository.findByProperty({ email }).then((user) => {
        if (!user.length) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const isMatch = authService.compare(password, user[0].password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        if (!user[0].isEmailVerified) {
            const error = new Error(
                'Your email has not been verified. Please check your email and verify your account before logging in.',
            );
            error.statusCode = 403; // sửa mã trạng thái thành 403 - Forbidden
            throw error;
        }
        if (!user[0].isActive) {
            const error = new Error(
                'Your account is inactive. Please check your email and verify your account before logging in.',
            );
            error.statusCode = 401; // sửa mã trạng thái thành 401 - Unauthorized
            throw error;
        }
        const payload = {
            user: {
                id: user[0].id,
            },
        };
        return {
            accessToken: authService.generateToken(payload),
            refreshToken: '',
        };
    });
}
