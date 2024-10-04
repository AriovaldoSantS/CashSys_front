import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToobarSuperiorProps {
  currentTime: Date;
  onLogout: () => void;
}

function ToobarSuperior({ currentTime, onLogout }: ToobarSuperiorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Redirecionar para diferentes páginas
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: 'black', width: '100%' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Navegação de Páginas à Esquerda */}
        <Box style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => handleNavigation('/sales')} style={{ color: 'white' }}>
            Vendas
          </Button>
          <Button onClick={() => handleNavigation('/stock')} style={{ color: 'white' }}>
            Estoque
          </Button>
          <Button onClick={() => handleNavigation('/report')} style={{ color: 'white' }}>
            Relatório
          </Button>
          <Button onClick={() => handleNavigation('/clients')} style={{ color: 'white' }}>
            Clientes
          </Button>
        </Box>

        {/* Data e Hora ao Centro */}
        <Typography variant="h6" style={{ color: 'white' }}>
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </Typography>

        {/* Botão de Logout à Direita */}
        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
            <LogoutIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ToobarSuperior;
