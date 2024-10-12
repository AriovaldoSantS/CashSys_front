import { Box, Typography } from '@mui/material';
import React from 'react';
import ToobarSuperior from '../components/ToobarSuperior';

function Finance() {
  return (
    <>
      <ToobarSuperior />
      {/* Conteúdo Principal */}
      <Box sx={{ marginTop: '64px', padding: '16px' }}>
        <Typography variant="h4" sx={{ color: '#000' }}>
          Página Financeira
        </Typography>
        {/* Adicione o conteúdo da página Financeira aqui */}
      </Box>
    </>
  );
}

export default Finance;
