import { Box, Typography } from '@mui/material';
import React from 'react';
import ToobarSuperior from '../components/ToobarSuperior';

function Report() {
  return (
    <>
      <ToobarSuperior />
      {/* Conteúdo Principal */}
      <Box sx={{ marginTop: '64px', padding: '16px' }}>
        <Typography variant="h4" sx={{ color: '#000' }}>
          Página de Relatório
        </Typography>
        {/* Adicione o conteúdo da página de Relatório aqui */}
      </Box>
    </>
  );
}

export default Report;
