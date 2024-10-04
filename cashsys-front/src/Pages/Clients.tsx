import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

function Clients() {
  // Dados de exemplo para a tabela (substitua pelo estado real)
  const [clients, setClients] = useState([
    { id: 1, name: 'Cliente 1', purchases: 5, lastPurchase: '01/10/2024' },
    { id: 2, name: 'Cliente 2', purchases: 3, lastPurchase: '25/09/2024' },
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>

      {/* Botões de ações */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
          Adicionar Cliente
        </Button>
        <Button variant="contained" color="secondary">
          Editar Cliente
        </Button>
      </Box>

      {/* Tabela de clientes */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Compras</TableCell>
            <TableCell>Última Compra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.purchases}</TableCell>
              <TableCell>{client.lastPurchase}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Clients;
