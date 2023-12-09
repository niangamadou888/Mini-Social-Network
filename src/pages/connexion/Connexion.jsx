import { Button, Box, Stack,Typography, TextField, Link } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Connexion() {
    
    const navigate = useNavigate();

    const inscription = () =>{
        navigate("/inscription");
      }
    
    useEffect(()=>{
        if(localStorage.getItem("utilisateur")){
            navigate("/")
        }
    })
    const {handleSubmit, register, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        axios
            .get(
                `https://mini-social-network.onrender.com/users/userExist/${data.mailUtilisateur}&${data.motDePasse}`
            )
            .then(res => {
                if (res.data > 0) {
                    localStorage.setItem("utilisateur", JSON.stringify(data));
                    navigate("/");
                    toast.success("Connexion reussie");
                } else {
                    toast.error("Les identifiants sont incorrects");
                }
            })
    };
  return (
    <Stack alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} backgroundColor={'#f5f5f5'}>
        <Box width={400} sx={{
            backgroundColor: "#fff",
            padding: 3,
        }}>
        <Typography variant='h5'>Connexion</Typography>
        <form style={{marginTop:4,}} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"column"} gap={2}>
        <TextField id="filled-basic" label="Veuillez saisir votre adresse email" variant="outlined" fullWidth size='small' type='email'{...register("mailUtilisateur", {required: "Veuillez saisir votre adresse mail", pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"})} />
        <TextField id="filled-basic" label="Veuillez saisir un mot de passe" variant="outlined" type='password' fullWidth size='small' {...register("motDePasse", {required: "Veuillez saisir un mot de passe", minLength: {value: 6, message: "Veuillez saisir un mot de passe de plus de 6 caractères"}})} />
            </Stack>
            <Button variant="contained" sx={{marginTop:2,}} type='submit'>Connexion</Button>
            <Typography paddingTop={2}>Voulez-vous creer un compte ?{" "}
            <Link onClick={inscription}>Cliquez ici</Link>
            </Typography>
        </form>
        </Box>
        
    </Stack>
  )
}
