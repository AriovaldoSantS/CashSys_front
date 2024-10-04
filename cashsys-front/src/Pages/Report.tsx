import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

function Report() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Relatório de Vendas
      </Typography>

      {/* Filtros e Ações */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
          Filtrar
        </Button>
        <Button variant="contained" color="secondary">
          Exportar Relatório
        </Button>
      </Box>

      {/* Conteúdo dos Relatórios */}
      <Box>
        <Typography variant="h6">Resumo Diário</Typography>
        {/* Adicione gráficos ou listas para detalhamento */}
        <Typography>Conteúdo do relatório...</Typography>
      </Box>
    </Container>
  );
}

export default Report;
