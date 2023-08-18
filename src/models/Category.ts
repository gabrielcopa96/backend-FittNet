import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
    },
});

const CategoryModel = model("Category", categorySchema);
export default CategoryModel;