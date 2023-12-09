import express from 'express';
import { Publication } from '../models/publicationModel.js';

const router = express.Router();

//Route for save a new user
router.post('/', async (req, res) => {
    try{
        if (
            !req.body.textPublication
        ) {
            return res.status(400).send({
                message: 'Send all required fields: textPublication'
            });
        }
        const newPublication = {
            textPublication: req.body.textPublication,
            imagePublication: req.body.imagePublication,
            datePublication: req.body.datePublication,
            likePublication: req.body.likePublication,
            auteur: req.body.auteur
        };

        const publication = await Publication.create(newPublication);
        return res.status(201).send(publication);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route for Get All Users from database
router.get('/', async(req,res) => {
    try{
        const publication = await Publication.find({});

        return res.status(200).json(publication);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route to delete a publication
router.delete('/:id', async (req,res) => {
    try{
        
        const { id } = req.params;
        const result = await Publication.findByIdAndDelete(id);

        if (!result){
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).send({ message: 'Book deleted successfully' });

        }
    } catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

export default router;
