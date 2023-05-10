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
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        isActive:{
          type:Boolean,
          default: true,
        },
        isDelete:{
            type:Boolean,
            default: false,
        },
        updateAt: Date,
        updateAt: Date,
    },
   
);

categorySchema.index({ name: 1, userId:1 }, { unique: true });

const CategoryModel = mongoose.model('Category', categorySchema);

CategoryModel.ensureIndexes((err) => {
    if (err) {
        return err;
    }
    return true;
});

export default CategoryModel;
