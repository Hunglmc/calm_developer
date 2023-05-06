import user from '../../../src/entities/user';
import { isEmail, isValidPhone } from '../../../untils/validator';

export default function addUser(
    username,
    password,
    email,
    role,
    fullName,
    phoneNumber,
    address,
    dateOfBirth,
    createdAt,
    userRepository,
    authService,
) {
    // TODO: add a proper validation (consider using @hapi/joi)
    if (!username || !password || !email || !fullName || !phoneNumber || !fullName) {
        throw new Error('username, password,fullName,phoneNumber and email fields cannot be empty');
    }

    if (!isValidPhone(phoneNumber)) {
        throw new Error(`${phoneNumber} is not a valid phone number in Vietnam!`);
    }

    if (!isEmail(email)) {
        throw new Error(`${phoneNumber} is not a valid email!`);
    }

    const newUser = user(
        username,
        authService.encryptPassword(password),
        email,
        role,
        fullName,
        phoneNumber,
        address,
        dateOfBirth,
        createdAt,
    );

    return userRepository
        .findByProperty({ username })
        .then((userWithUsername) => {
            if (userWithUsername.length) {
                throw new Error(`User with username: ${username} already exists`);
            }
            return userRepository.findByProperty({ email });
        })
        .then((userWithEmail) => {
            if (userWithEmail.length) {
                throw new Error(`User with email: ${email} already exists`);
            }
            return userRepository.findByProperty({ phoneNumber });
        })
        .then((userWhithPhoneNumber) => {
            if (userWhithPhoneNumber.length) {
                throw new Error(`User with phone number: ${phoneNumber} already exists`);
            }
            return userRepository.add(newUser);
        });
}
