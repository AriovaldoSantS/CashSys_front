import { Avatar, Box, Button, List, ListItem, Typography } from '@mui/material';
import React from 'react';

// Tipagem das props (se necessário)
interface SidebarProps {
  employeeName: string;
}

function Sidebar({ employeeName }: SidebarProps) {
  return (
    <Box
      sx={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Foto do funcionário */}
      <Avatar sx={{ width: 100, height: 100, marginBottom: '10px' }} />

      {/* Nome do funcionário */}
      <Typography variant="h6" gutterBottom>
        {employeeName}
      </Typography>

      {/* Menu de ações */}
      <List sx={{ width: '100%' }}>
        {['Abertura de Caixa', 'Nova Venda', 'Consulta de Produto', 'Fechamento de Caixa'].map((action) => (
          <ListItem key={action} sx={{ padding: '10px 0' }}>
            <Button variant="contained" fullWidth>
              {action}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
