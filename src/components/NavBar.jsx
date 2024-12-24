import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#002060', px: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo et titre */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HomeIcon sx={{ color: 'white', fontSize: 30 }} />
          <Typography variant="h6" color="white" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            Armurerie Mechrgui
          </Typography>
        </Box><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/cards')}
            sx={{
              textTransform: 'none',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Cards
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/commande')}
            sx={{
              textTransform: 'none',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Commande
          </Button>
          <IconButton
            color="inherit"
            onClick={() => navigate('/pannier')}
            sx={{ '&:hover': { color: '#FFD700' },width:20 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          {/* Bouton de déconnexion */}
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ '&:hover': { color: '#FF6347' },width:20 }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
