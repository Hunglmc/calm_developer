export default function user(username, password, email, role, fullName, phoneNumber, address, dateOfBirth, createdAt) {
    return {
        getUserName: () => username,
        getPassword: () => password,
        getEmail: () => email,
        getRole: () => role,
        getFullName: () => fullName,
        getPhoneNumber: () => phoneNumber,
        getAddress: () => address,
        getDateOfBirth: () => dateOfBirth,
        getCreatedAt: () => createdAt,
    };
}
