import { Stack, TextField, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AjouterPublication() {
    const parsedInfo = JSON.parse(localStorage.getItem("utilisateur"));
    const [user, setUser] = useState({});

    useEffect( ()=>{
        axios.get(`https://mini-social-network.onrender.com/users/mail/${parsedInfo.mailUtilisateur}`).then(
            response => {setUser(response.data[0])}
        );
    },[]);



    const {handleSubmit, register, reset, formState: {errors}} = useForm();
    const useQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (pub) => {
          return axios.post('https://mini-social-network.onrender.com/publications', pub)
        },
        onError: (error) => {
            toast.error("Une erreur est survenue");
        },
        onSuccess: () =>{
            reset();
            useQuery.invalidateQueries("publications");
            toast.success("Publication Ajoutee avec succes");
        }
      })
    const onSubmit = (data) => {
        const publication = {
            ...data,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur,
        }
        mutation.mutate(publication);
    };
    
  return (
  <Stack width={"60%"} margin={"auto"}>
    <h1>Ajouter une publication</h1>
    <form style={{
        marginTop: 4,
    }}
    onSubmit={handleSubmit(onSubmit)}
    >
        <Stack gap={2}>
        <TextField id="filled-basic" label="Partagez-nous de votre journée" variant="outlined" fullWidth size="small" type="text" multiline rows={4} {...register("textPublication", {
            required: "Veuillez saisir un texte",
            minLength: {
                value: 10,
                message: "Veuillez saisir un texte de plus de 5 caracteres",
            }
        })} />
        <TextField id="filled-basic" label="Saisir l'URL de votre image" variant="outlined" fullWidth size="small" type="text" {...register("imagePublication")} />
        <Button variant="contained" type="submit">Publier</Button>
        </Stack>
    </form>
  </Stack>);
}
