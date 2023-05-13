export default {
    port: process.env.PORT || 1234,
    ip: process.env.HOST || '0.0.0.0',
    mongo: {
        uri:
            process.env.MONGO_URL ||
            'mongodb+srv://tinhoc112bkav:<fuUn9xHSusassHeg>@cluster0.tyohwjy.mongodb.net/?retryWrites=true&w=majority',
    },
    redis: {
        uri: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    jwtSecret: {
        secret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237',
        resetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES || '5',
    },
    email: {
        from: process.env.CLIENT_EMAIL || 'lehungnthao@gmail.com',
        client: {
            id: process.env.CLIENT_ID || '92078775291-5o0p286reqqj580c4jrcdqu048revni3.apps.googleusercontent.com',
            secret: process.env.CLIENT_SECRET || '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',
        },
        RedirectUri: process.env.REDIRECT_URI || 'https://developers.google.com/oauthplayground',
        RefreshToken:
            process.env.REFRESH_TOKEN ||
            '1//04RbKghB1WnvvCgYIARAAGAQSNwF-L9IraPI23SE2WVzOX5xZslJL1JC6Lyz7fCOUnyVppyk2sKhbLqGd5khJGQvE3b0tP5vqQuw',
    },
};
