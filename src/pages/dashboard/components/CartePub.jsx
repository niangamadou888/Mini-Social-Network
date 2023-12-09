import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Box, Stack, Avatar, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CartePub({publication}) {
    const parsedInfo = JSON.parse(localStorage.getItem("utilisateur"));
    const [user, setUser] = useState({});

    useEffect( ()=>{
        axios.get(`https://mini-social-network.onrender.com/users/mail/${parsedInfo.mailUtilisateur}`).then(
            response => {setUser(response.data[0])}
        );
    },[]);


    const useQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`https://mini-social-network.onrender.com/publications/${id}`);
        },
        onError: (error) => {
            toast.error("Une erreur est survenue");
        },
        onSuccess: () => {
            useQuery.invalidateQueries("publications");
            toast.success("Publication supprimée avec succes");
        }
    })

    const supprimerPublication = (id) => {
        mutation.mutate(id);
    };
  return (
    <Box width={"100%"} bgcolor={"#ffff"} borderRadius={4} margin={3} padding={2}>
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <Avatar src={publication.photoUtilisateur} />
                    <Typography>{publication.auteur}</Typography>
                    {
                        user.nomUtilisateur === publication.auteur &&
                        (<IconButton aria-label="delete" onClick={()=>supprimerPublication(publication._id)}>
                        <DeleteIcon />
                        </IconButton>)
                    }
                </Stack>
                <Typography>{publication.textPublication}</Typography>
                
                <img src={publication.imagePublication} style={{
                    width:"100%", borderRadius: 4,
                }}/>
    </Box>
  )
}
