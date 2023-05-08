import moment from 'moment/moment';
import config from '../../../config/config';
import { sendResetPasswordEmail } from '../../../untils/sendEmail';

export default async function forgotPasswor(email, userRepository) {
    if (!email) {
        const error = new Error('Email field is required.');
        error.statusCode = 400;
        throw error;
    }
    const user = await userRepository.findByProperty({ email });
    // 2) Check if user does not exist
    if (!user.length) {
        const error = new Error(`No user found with this email ${email}`);
        error.statusCode = 404;
        throw error;
    }
    const expires = moment().add(config.jwtSecret.resetPasswordExpirationMinutes, 'minutes');
    //const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
    const resetPasswordToken = 'Flgls=Math.random()';
    //await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
    return await sendResetPasswordEmail(email, resetPasswordToken);
}
