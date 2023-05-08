import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const tokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
        },
        expires: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

/**
 * @typedef Token
 */
const TokenModel = mongoose.model('Token', tokenSchema);

TokenModel.ensureIndexes((err) => {
    if (err) {
        return err;
    }
    return true;
});

export default TokenModel;
