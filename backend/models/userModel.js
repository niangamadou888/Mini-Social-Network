import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        nomUtilisateur: {
            type: String,
            required: true,
        },
        mailUtilisateur: {
            type: String,
            required: true,
        },
        motDePasse: {
            type: String,
            required: true,
        },
        motDePasseConfirmation: {
            type: String,
            required: true,
        }
        
    },
    {
        timestamps: true,
    }
);

export const Utilisateur = mongoose.model('Cat', userSchema);