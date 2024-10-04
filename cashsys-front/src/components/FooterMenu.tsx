import { Box, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

// Define o tipo para os itens do menu (se necessário)
interface FooterMenuProps {
  onNavigate: (page: string) => void;
}

function FooterMenu({ onNavigate }: FooterMenuProps) {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#333', // Cor contrastante
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <List sx={{ display: 'flex' }}>
        {/* Ajuste do ListItem para incluir o component corretamente */}
        <ListItem component="button" onClick={() => onNavigate('stock')} sx={{ cursor: 'pointer' }}>
          <ListItemText primary="Página de Estoque" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem component="button" onClick={() => onNavigate('sales')} sx={{ cursor: 'pointer' }}>
          <ListItemText primary="Página de Vendas" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem component="button" onClick={() => onNavigate('report')} sx={{ cursor: 'pointer' }}>
          <ListItemText primary="Relatório" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem component="button" onClick={() => onNavigate('clients')} sx={{ cursor: 'pointer' }}>
          <ListItemText primary="Clientes" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Box>
  );
}

export default FooterMenu;
