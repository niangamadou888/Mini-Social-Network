import React, { useEffect } from 'react';
import { useNavigate } from 'react-router'
import Navbar from './components/Navbar';
import { Box, Stack, Avatar, Typography } from '@mui/material';
import AjouterPublication from './components/AjouterPublication';
import axios from 'axios';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import CartePub from './components/CartePub';


export default function Dashboard() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("utilisateur")){
            navigate("/connexion")
        }
    })
    const queryClient = useQueryClient();
    const {data:publications, error, isLoading} = useQuery({
        queryKey: ["publications"],
        queryFn: () => axios.get("https://mini-social-network.onrender.com/publications").then((res) => res.data),
        onerror: (error) => console.log(error),
    })
    if (isLoading){
        return <div>chargement</div>
    }

    let pubTrier = publications.sort((a,b) =>{
        return new Date(b.datePublication) - new Date(a.datePublication);
    })

    return (
        <Box bgcolor={"#ffeeff"}>
        <Navbar />
        <AjouterPublication />
        <Box width={"60%"} margin={"auto"} marginTop={4}>
        {publications && pubTrier.map((publication) => (
    <CartePub key={publication.id} publication={publication} />
))}
        </Box>
    </Box>
    );
}
