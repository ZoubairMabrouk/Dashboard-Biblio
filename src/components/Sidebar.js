import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Category, ExitToAppOutlined, ProductionQuantityLimits } from '@mui/icons-material';
import { logout } from '../services/auth';

const Sidebar = () => {

  const handlelogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: '#000041',
        color: 'white',
        padding: 2,
      }}
    >
      <List>
        <ListItem button component="a" href="/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/users">
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component="a" href="/command">
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Commande" />
        </ListItem>
        <ListItem button component="a" href="/subscribe">
          <ListItemIcon>
            <ReceiptIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Subscribe" />
        </ListItem>
        
        <ListItem button component="a" href="/typesub">
          <ListItemIcon>
            <ReceiptIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="TypeSubscribe" />
        </ListItem>
        
        <ListItem button component="a" href="/book">
          <ListItemIcon>
            <ProductionQuantityLimits sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Book" />
        </ListItem>
        <ListItem button component="a" href="/typebook">
          <ListItemIcon>
            <Category sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="TypesBook" />
        </ListItem>
        <ListItem button component="a" href="/author">
          <ListItemIcon>
            <Category sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Author" />
        </ListItem>
        
      </List>
      <List sx={{ position: 'absolute', bottom: 20, width: '100%' }}>
        <ListItem button onClick={handlelogout}>
          <ListItemIcon>
            <ExitToAppOutlined sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
