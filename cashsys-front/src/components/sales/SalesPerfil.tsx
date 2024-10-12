import { Avatar, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import NewSaleDialog from '../NewSaleDialog';
import OpenCashDialog from '../OpenCashDialog';

// Função para buscar produtos do banco de dados
const fetchProductsFromDatabase = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/produtos');
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const data = await response.json();
    return data; // Certifique-se de que o formato corresponde a [{ id, name, price }]
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

// Função para fechar o caixa
const closeCash = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/caixa/fechar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_caixa: 1, // Substitua com o ID do caixa correto
        valor_final: 500, // Substitua com o valor final real
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao fechar o caixa');
    }

    const data = await response.json();
    console.log('Caixa fechado com sucesso:', data);
  } catch (error) {
    console.error('Erro ao fechar o caixa:', error.message);
  }
};

function SalesPerfil({ employeeName, onOpenCash, onNewSale }) {
  // Controle do pop-up de "Abrir Caixa"
  const [openCashDialog, setOpenCashDialog] = useState(false);
  const handleOpenCash = () => setOpenCashDialog(true);
  const handleCloseCash = () => setOpenCashDialog(false);
  const handleConfirmOpenCash = (initialCash) => {
    console.log(`Caixa aberto com valor inicial de R$ ${initialCash}`);
    setOpenCashDialog(false);
  };

  // Controle do pop-up de "Nova Venda"
  const [openSaleDialog, setOpenSaleDialog] = useState(false);
  const [products, setProducts] = useState([]);

  const handleOpenSale = async () => {
    const fetchedProducts = await fetchProductsFromDatabase();
    setProducts(fetchedProducts);
    setOpenSaleDialog(true);
  };

  const handleCloseSale = () => setOpenSaleDialog(false);

  const handleConfirmSale = (saleData) => {
    console.log('Nova venda:', saleData);
    setOpenSaleDialog(false);
    onNewSale(saleData); // Envia a nova venda para o componente pai (Sales)
  };

  return (
    <>
      <Box
        sx={{
          width: '33.33%',
          padding: '16px',
          backgroundColor: '#FFF',
          borderRight: '2px solid #000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '16px',
        }}
      >
        {/* Avatar e Nome do Funcionário */}
        <Avatar
          sx={{
            width: '60%',
            height: 'auto',
            aspectRatio: '1 / 1',
            marginBottom: '16px',
            border: '2px solid #000',
          }}
        >
          <img src="/path/to/user-icon.png" alt="Perfil" style={{ width: '100%', borderRadius: '50%' }} />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'capitalize', textAlign: 'center' }}>
          {employeeName}
        </Typography>

        {/* Botões de Ações Lado a Lado */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
          <Button variant="outlined" sx={{ borderColor: '#000', color: '#000' }} onClick={handleOpenCash}>
            Abrir CX
          </Button>
          <Button variant="outlined" sx={{ borderColor: '#000', color: '#000' }} onClick={closeCash}>
            Fechar CX
          </Button>
          <Button variant="outlined" sx={{ borderColor: '#000', color: '#000' }} onClick={handleOpenSale}>
            Nova Venda
          </Button>
          <Button variant="outlined" sx={{ borderColor: '#000', color: '#000' }}>
            Cancelar
          </Button>
          <Button variant="outlined" sx={{ borderColor: '#000', color: '#000' }}>
            Saída
          </Button>
          <Button variant="outlined" sx={{ borderColor: '#000', color: '#000' }}>
            Consulta
          </Button>
        </Box>
      </Box>

      {/* Componente para "Abrir Caixa" */}
      <OpenCashDialog open={openCashDialog} onClose={handleCloseCash} onConfirm={handleConfirmOpenCash} />

      {/* Componente para "Nova Venda" */}
      <NewSaleDialog open={openSaleDialog} onClose={handleCloseSale} onConfirm={handleConfirmSale} products={products} />
    </>
  );
}

export default SalesPerfil;
