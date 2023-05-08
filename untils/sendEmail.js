// Packages
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Configs
import config from '../config/config';

// Utils
import catchAsync from './catchAsync';
import AppError from './appError';

/**
 * @desc    Send an email
 * @param   { String } to - Send to
 * @param   { String } subject - Mail subject
 * @param   { String } text - Mail body
 * @returns { Promise }
 */
const sendEmail = catchAsync(async (to, subject, text) => {
    const OAuth2Client = new google.auth.OAuth2(
        config.email.client.id,
        config.email.client.secret,
        config.email.RedirectUri,
    );

    OAuth2Client.setCredentials({ refresh_token: config.email.RefreshToken });

    try {
        // Generate the accessToken on the fly
        const accessToken = await OAuth2Client.getAccessToken();

        // Create the email envelope (transport)
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: config.email.from,
                clientId: config.email.client.id,
                clientSecret: config.email.client.secret,
                refreshToken: config.email.RefreshToken,
                accessToken: accessToken,
            },
        });

        // Create the email options and body
        const mailOptions = {
            from: `Mahmoud Yasser - Ecommerce API < ${config.email.from} >`,
            to,
            subject,
            text,
        };
        // Return a Promise that resolves with the result object
        return new Promise((resolve, reject) => {
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject({
                        errors: error,
                        status: 404,
                    });
                } else {
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    resolve({
                        messageId: info.messageId,
                        response: info.response,
                        messages: `Email sent successfully to  ${to}`,
                        status: 200,
                    });
                }
            });
        });
        // Set up the email options and delivering it
    } catch (error) {
        return new AppError(error, 500);
    }
});

/**
 * @desc    Send reset password email
 * @param   { String } to - Mail to
 * @param   { String } token - Reset password token
 * @returns { Promise }
 */
export const sendResetPasswordEmail = catchAsync(async (to, token) => {
    const subject = 'Reset password';
    const resetPasswordUrl = `/reset-password?token=${token}`;
    const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;

    return await sendEmail(to, subject, text);
});

/**
 * @desc    Send After Reset Password email
 * @param   { String } to - Mail to
 * @returns { Promise }
 */
export const sendAfterResetPasswordMessage = catchAsync(async (to) => {
    const subject = 'Password Reset Successfully';
    const text = `Your password has successfully been reset.
  Do not hesitate to contact us if you have any questions.`;

    await sendEmail(to, subject, text);
});

/**
 * @desc    Send verification email
 * @param   { String } to - Mail to
 * @param   { String } token - Verify token
 * @returns { Promise }
 */
export const sendVerificationEmail = catchAsync(async (to, token) => {
    const subject = 'Email Verification';
    const verificationEmailUrl = `/verify-email?token=${token}`;
    const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;

    await sendEmail(to, subject, text);
});
