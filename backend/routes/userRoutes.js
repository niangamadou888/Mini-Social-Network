import express from 'express';
import { Utilisateur } from '../models/userModel.js';

const router = express.Router();

//Route for save a new user
router.post('/', async (req, res) => {
    try{
        if (
            !req.body.nomUtilisateur ||
            !req.body.mailUtilisateur ||
            !req.body.motDePasse ||
            !req.body.motDePasseConfirmation
        ) {
            return res.status(400).send({
                message: 'Send all required fields: nomUtilisateur, mailUtilisateur, motDePasse, motDePasseConfirmation'
            });
        }
        const newUtilisateur = {
            nomUtilisateur: req.body.nomUtilisateur,
            mailUtilisateur: req.body.mailUtilisateur,
            motDePasse: req.body.motDePasse,
            motDePasseConfirmation: req.body.motDePasseConfirmation
        };

        const utilisateur = await Utilisateur.create(newUtilisateur);
        return res.status(201).send(utilisateur);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route for Get All Users from database
router.get('/', async(req,res) => {
    try{
        const users = await Utilisateur.find({});

        return res.status(200).json(users);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route for Get user by id
router.get('/:id', async(req,res) => {
    try{

        const { id } = req.params;


        const user = await Utilisateur.findById(id);

        return res.status(200).json(user);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route for Get number of user by mailutilisateur
router.get('/mails/:mailUtilisateur', async(req,res) => {
    try{

        const { mailUtilisateur } = req.params;


        const mail = await Utilisateur.find({ mailUtilisateur: mailUtilisateur  }).count();

        return res.status(200).json(mail);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route for Get user by mailutilisateur
router.get('/mail/:mailUtilisateur', async(req,res) => {
    try{

        const { mailUtilisateur } = req.params;


        const mail = await Utilisateur.find({ mailUtilisateur: mailUtilisateur  });

        return res.status(200).json(mail);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route for Get number of user by mailutilisateur and password
router.get('/userExist/:mailUtilisateur&:motDePasse', async(req,res) => {
    try{

        const { mailUtilisateur,motDePasse } = req.params;


        const userExist = await Utilisateur.find({ mailUtilisateur: mailUtilisateur, motDePasse: motDePasse  }).count();

        return res.status(200).json(userExist);
    } catch (err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route for update a book
router.put('/:id', async (req,res) => {
    try{

        if (
            !req.body.nomUtilisateur ||
            !req.body.mailUtilisateur ||
            !req.body.motDePasse ||
            !req.body.motDePasseConfirmation
        ) {
            return res.status(400).send({
                message: 'Send all required fields: nomUtilisateur, mailUtilisateur, motDePasse, motDePasseConfirmation'
            });
        }

        const { id } = req.params;
        const result = await Utilisateur.findByIdAndUpdate(id, req.body);

        if (!result){
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).send({ message: 'Book updated successfully' });

        }

    } catch(err){
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

//Route to delete a book
router.delete('/:id', async (req,res) => {
    try{
        
        const { id } = req.params;
        const result = await Utilisateur.findByIdAndDelete(id);

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