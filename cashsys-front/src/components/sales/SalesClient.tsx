import DescriptionIcon from '@mui/icons-material/Description'; // Ícone de pergaminho para detalhar venda
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Sale {
  id: number;
  clientName: string; // Nome do cliente
  totalValue: number; // Valor total da venda
  cartItems: Array<{ name: string; quantity: number; price: number }>; // Produtos comprados
  paymentMethod: string; // Método de pagamento
}

interface SalesClientProps {
  salesData: Sale[];
}

function SalesClient({ salesData }: SalesClientProps) {
  const [vendas, setVendas] = useState<Sale[]>(salesData);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  // Atualizar o estado das vendas com base nas novas vendas geradas
  useEffect(() => {
    setVendas(salesData);
  }, [salesData]);

  // Função para abrir o pop-up de detalhes da venda
  const handleDetailSale = (sale: Sale) => {
    setSelectedSale(sale);
  };

  // Função para fechar o pop-up de detalhes
  const handleCloseDetail = () => {
    setSelectedSale(null);
  };

  return (
    <Box
      sx={{
        flex: 1,
        padding: '16px',
        backgroundColor: '#FFF',
        borderRight: '2px solid #000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Vendas do Dia
      </Typography>

      {/* Lista de Vendas com visualização intercalada */}
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {vendas.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '16px' }}>
            Nenhuma venda registrada
          </Typography>
        ) : (
          vendas.map((sale, index) => (
            <React.Fragment key={`${sale.id}-${index}`}>
              <ListItem
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ListItemText
                  primary={`${sale.clientName || `Venda ${sale.id}`} - R$ ${sale.totalValue.toFixed(2)}`}
                />
                {/* Ícone de pergaminho para detalhar a venda */}
                <IconButton onClick={() => handleDetailSale(sale)}>
                  <DescriptionIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        )}
      </List>

      {/* Pop-up de Detalhes da Venda */}
      {selectedSale && (
        <Dialog open={true} onClose={handleCloseDetail} maxWidth="sm" fullWidth>
          <DialogTitle>Detalhes da Venda</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Cliente: {selectedSale.clientName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Método de Pagamento: {selectedSale.paymentMethod}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Produtos:
            </Typography>
            {selectedSale.cartItems.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {item.name} - {item.quantity}x
                </Typography>
                <Typography variant="body2">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ margin: '8px 0' }} />
            <Typography variant="h6">
              Total: R$ {selectedSale.totalValue.toFixed(2)}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}

export default SalesClient;
