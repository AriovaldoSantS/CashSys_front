import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface Sale {
  id: number;
  value: number;
}

interface Product {
  name: string;
  quantity: number;
}

interface ContentAreaProps {
  sales: Sale[];
  products: Product[];
  totalSales: number;
}

function ContentArea({ sales, products, totalSales }: ContentAreaProps) {
  return (
    <Grid container sx={{ padding: 2 }}>
      {/* Vendas do Dia */}
      <Grid item xs={6} sx={{ padding: 2, border: '1px solid #FFF', marginBottom: 2 }}>
        <Typography variant="h6">Vendas</Typography>
        <List>
          {sales.map((sale) => (
            <ListItem key={sale.id}>
              <ListItemText primary={`Venda ${sale.id}`} secondary={`R$ ${sale.value.toFixed(2)}`} />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Produtos e Estoque */}
      <Grid item xs={6} sx={{ padding: 2, border: '1px solid #FFF' }}>
        <Typography variant="h6">Produtos e Estoque</Typography>
        <List>
          {products.map((product, index) => (
            <ListItem key={index}>
              <ListItemText primary={product.name} secondary={`${product.quantity} unidades`} />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Total de Vendas */}
      <Grid item xs={12} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Total do Dia: R$ {totalSales.toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
}

export default ContentArea;
