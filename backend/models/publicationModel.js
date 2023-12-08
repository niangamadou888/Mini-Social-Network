import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
    {
        textPublication: {
            type: String,
            required: true,
        },
        imagePublication: {
            type: String,
        },
        datePublication: {
            type: String,
        },
        likePublication: {
            type: Number,
        },
        auteur: {
            type: String,
        }
        
    },
    {
        timestamps: true,
    }
);

export const Publication = mongoose.model('Dog', publicationSchema);