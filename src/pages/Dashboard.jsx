import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { getusers } from '../services/auth';
import { fetchcommandes } from '../services/commandeservice';


const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const fetchUsers = async () =>{
    const users = await getusers();
    setStats({...stats, totalUsers: users.length });
    
  }
   const fetchcommande = async ()=> {
      try {
        const response = await fetchcommandes();
        setStats({...stats, totalOrders: response.length });
        
      } catch (error) {
        console.error('Error fetching users:', error);
        
      }
    };
    useEffect(() => {
   fetchUsers();
   fetchcommande();},[]);
    



  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{stats.totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h3">{stats.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h3">${stats.totalRevenue}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
