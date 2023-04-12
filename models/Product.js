import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        id: { type: Number, required: true, unique: true },
        category: { type: String, required: true },
        image_url: { type: String, required: true },
        sale_price: { type: Number, required: true },
        brand: { type: String, required: true },
        average_product_rating: { type: Number, required: true, default: 0 },
        num_reviews: { type: Number, required: true, default: 0 },
        list_price: { type: Number, required: true, default: 0 },
        description: { type: String, required: true },
        isFeatured: { type: Boolean, default: false },
        banner: String
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;