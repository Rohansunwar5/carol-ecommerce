import mongoose from 'mongoose';

export enum ISizes {
    XS = 'xs',
    S = 's',
    M = 'm',
    L = 'l',
    XL = 'xl',
    XXL = 'xxl',
    XXXL = 'xxxl'
}

const sizeStockSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        enum: ISizes
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        sizeStock: [sizeStockSchema],
        sizeChart: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        originalPrice: {
            type: Number,
            min: 0,
        },
        description: {
            type: String,
            trim: true,
            maxLength: 2000
        }, 
        images: [{
            type: String,
            required: true,
        }],
        offer: {
            type: mongoose.Types.ObjectId,
        },
        ratings: [{
            userId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
             value: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            review: {
                type: String,
                maxLength: 500
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        isActive: {
            type: Boolean,
            default: true,
        },
        tags: [{
            type: String,
            trim: true,
        }]
    }, { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

export interface ISizeStock {
    size: string;
    stock: number;
}

export interface IProduct extends mongoose.Schema {
    _id: string;
    name: string;
    code: string;
    category: mongoose.Types.ObjectId;
    sizeStock: ISizeStock[];
    sizeChart?: string;
    price: number;
    originalPrice?: number;
    description?: string;
    images: string [];
    offer?: mongoose.Types.ObjectId;
    ratings: Array< {
        userId: mongoose.Types.ObjectId;
        value: number;
        review?: string;
        createdAt: Date;
    }>;
    isActive: boolean;
    tags?: string [];
}

export default mongoose.model<IProduct>('Product', productSchema);