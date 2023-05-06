import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    created_at: {
        type: Date,
        default: Date.now,
        require: false,
    },
    updated_at: {
        type: Date,
        default: Date.now,
        require: false,
    },
    createBy: {
        type: String,
        require: false,
    },
    updateBy: {
        type: String,
        require: false,
    },
});

// CategoryModel = mongoose.model('Category', CategorySchema);

// CategoryModel.ensureIndexes((err) => {
//     if (err) {
//         return err;
//     }
//     return true;
// });

export default CategoryModel;
