import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';
import axios from 'axios';
import { deletecommandes, fetchcommandes } from '../../services/commandeservice';

const Command = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchcommande = async ()=> {
    try {
      const response = await fetchcommandes();
      setCommandes(response.data);
      console.log(commandes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };
  

  // Fetch users from the server
  useEffect(() => {
    fetchcommande()}, []);

  

  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Client Name</TableCell>
            
            <TableCell>Book Name</TableCell>
            <TableCell>Date of Commande</TableCell>
            
            <TableCell>Type of Commande</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">Loading...</TableCell>
            </TableRow>
          ) : (
            commandes.map((com) => (
              <TableRow key={com.id}>
                <TableCell>{com.id}</TableCell>
                <TableCell>{com.userId}</TableCell>
                <TableCell>{com.bookId}</TableCell>
                <TableCell>{com.command_Date}</TableCell>
                <TableCell>{com.commandType}</TableCell>
                <TableCell>{com.price}</TableCell>
                
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Command;
