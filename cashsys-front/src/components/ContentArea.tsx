import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface ContentAreaProps {
  sales: Array<{ productName: string; quantity: number; price: number }>;
  totalSales: number;
}

function ContentArea({ sales, totalSales }: ContentAreaProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#ffffff',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Produtos Vendidos Hoje
      </Typography>
      <List>
        {sales.map((sale, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${sale.productName} - Quantidade: ${sale.quantity}`}
              secondary={`Preço: ${sale.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Total de Vendas: {totalSales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Typography>
    </Box>
  );
}

export default ContentArea;
