import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

categorySchema.index({ name: 1 }, { unique: true });

const CategoryModel = mongoose.model('Category', categorySchema);

CategoryModel.ensureIndexes((err) => {
    if (err) {
        return err;
    }
    return true;
});

export default CategoryModel;
