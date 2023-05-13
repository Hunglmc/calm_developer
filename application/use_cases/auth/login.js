export default function login(email, password, userRepository, authService) {
    if (!email || !password) {
        const error = new Error('email and password fields cannot be empty');
        error.statusCode = 401;
        throw error;
    }
    return userRepository.findByProperty({ email }).then((user) => {
        console.log('------------------deni:', user.length);
        if (user.length <= 0) {
            console.log('d----dd-----');
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const isMatch = authService.compare(password, user[0].password);
        console.log('d----dd---isMatch--', isMatch);
        if (!isMatch) {
            console.log('d----dd---password--', user[0].password);
            console.log('d----dd---1111--');
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        if (!user[0].isEmailVerified) {
            console.log('user[0]-----1111', user[0]);
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
