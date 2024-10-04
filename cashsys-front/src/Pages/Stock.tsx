import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

function Stock() {
  // Dados de exemplo para a tabela (substitua pelo estado real)
  const [products, setProducts] = useState([
    { id: 1, name: 'Produto 1', quantity: 10, price: 5.0 },
    { id: 2, name: 'Produto 2', quantity: 15, price: 10.0 },
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Estoque
      </Typography>

      {/* Botões de ações */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
          Adicionar Produto
        </Button>
        <Button variant="contained" color="secondary">
          Editar Produto
        </Button>
      </Box>

      {/* Tabela de produtos */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Stock;
