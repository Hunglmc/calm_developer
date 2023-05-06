import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const OdersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

OdersSchema.index({ userId: 1, title: 1 });

const OderModel = mongoose.model('Oder', OdersSchema);

OderModel.ensureIndexes((err) => {
    if (err) {
        return err;
    }
    return true;
});

export default OderModel;
