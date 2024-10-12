import NotificationsIcon from '@mui/icons-material/Notifications';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link do React Router
import logo from '../img/logo.png';

function ToobarSuperior() {
  return (
    <AppBar 
      position="fixed" 
      sx={{ backgroundColor: '#000', width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo e Nome da Empresa - Clicando leva para Vendas */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/sales">
            <img
              src={logo} // Certifique-se de que o caminho para a logo está correto
              alt="Logo da Empresa"
              style={{ maxHeight: '40px', marginRight: '8px', cursor: 'pointer' }}
            />
          </Link>
          <Typography variant="h6" component="div" sx={{ color: '#FFF', fontWeight: 'bold' }}>
            Nova Foto Ideal
          </Typography>
        </Box>

        {/* Itens de Navegação */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link to="/sales" style={{ textDecoration: 'none', color: '#FFF' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              Vendas
            </Typography>
          </Link>
          <Link to="/stock" style={{ textDecoration: 'none', color: '#FFF' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              Estoque
            </Typography>
          </Link>
          <Link to="/report" style={{ textDecoration: 'none', color: '#FFF' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              Relatório
            </Typography>
          </Link>
          <Link to="/clients" style={{ textDecoration: 'none', color: '#FFF' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              Clientes
            </Typography>
          </Link>
          <Link to="/finance" style={{ textDecoration: 'none', color: '#FFF' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              Financeiro
            </Typography>
          </Link>
          <Link to="/support" style={{ textDecoration: 'none', color: '#FFF' }}>
            <Typography variant="body1" sx={{ cursor: 'pointer' }}>
              Suporte
            </Typography>
          </Link>
        </Box>

        {/* Ícones à Direita */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ color: '#FFF' }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ color: '#FFF' }}>
            <SettingsIcon />
          </IconButton>
          <IconButton sx={{ color: '#FFF' }}>
            <OpenInNewIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ToobarSuperior;
