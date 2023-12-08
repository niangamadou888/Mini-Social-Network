import { Button, Box, Stack,Typography, TextField } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Inscription() {
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        if (data.motDePasse != data.motDePasseConfirmation){
            toast.error("Les mots de passe ne correspondent pas");
        } else {
            axios.get(`http://localhost:5555/users/mails/${data.mailUtilisateur}`)
            .then((res) =>{
                if (res.data>0){
                    toast.error("Un compte existe déja avec cette adresse mail");
                } else {
                    axios
            .post("http://localhost:5555/users", data)
            .then((res) => {
                toast.success("Inscription reussie");
                navigate("/connexion");
            })
            .catch((err) =>{
                toast.error("Une erreur est survenue");
            })
                }
            });
            
        }
    };
  return (
    <Stack alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} backgroundColor={'#f5f5f5'}>
        <Box width={400} sx={{
            backgroundColor: "#fff",
            padding: 3,
        }}>
        <Typography variant='h5'>Inscription</Typography>
        <form style={{marginTop:4,}} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"column"} gap={2}>
        <TextField id="filled-basic" label="Veuillez saisir votre nom" variant="outlined" fullWidth size='small' {...register("nomUtilisateur", {required: "Veuillez saisir un nom", minLength: {value: 5, message: "Veuillez saisir un nom de plus de 6 caractères"}})} />
        <TextField id="filled-basic" label="Veuillez saisir votre adresse email" variant="outlined" fullWidth size='small' type='email'{...register("mailUtilisateur", {required: "Veuillez saisir votre adresse mail", pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"})} />
        <TextField id="filled-basic" label="Veuillez saisir un mot de passe" variant="outlined" type='password' fullWidth size='small' {...register("motDePasse", {required: "Veuillez saisir un mot de passe", minLength: {value: 6, message: "Veuillez saisir un mot de passe de plus de 6 caractères"}})} />
        <TextField id="filled-basic" label="Veuillez confirmer votre mot de passe" variant="outlined" type='password' fullWidth size='small' {...register("motDePasseConfirmation", {required: "Veuillez confirmer votre mot de passe", minLength: {value: 6, message: "Veuillez saisir un mot de passe de plus de 6 caractères"}})}/>
        
            </Stack>
            <Button variant="contained" sx={{marginTop:2,}} type='submit'>Inscription</Button>
        </form>
        </Box>
        
    </Stack>
  )
}