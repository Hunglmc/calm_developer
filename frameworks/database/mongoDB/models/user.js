import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'],
        default: 'user',
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        require: false,
    },
    dateOfBirth: {
        type: String,
        required: false,
        // định dạng theo đúng yêu cầu (dd/mm/yyyy)
        validate: {
            validator: function (value) {
                const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                return regex.test(value);
            },
            message: 'Invalid date format. Please use dd/mm/yyyy.',
        },
        require: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    profileImageId: {
        type: String,
        required: false,
    },
    createdAt: Date,
    updateAt: Date,
});

UserSchema.index({ role: 1 });

const UserModel = mongoose.model('User', UserSchema);
UserModel.ensureIndexes((err) => {
    if (err) {
        return err;
    }
    return true;
});

export default UserModel;
