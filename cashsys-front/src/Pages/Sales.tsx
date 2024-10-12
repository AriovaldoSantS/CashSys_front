import { Box } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import OpenCashDialog from '../components/OpenCashDialog';
import ToobarSuperior from '../components/ToobarSuperior';
import SalesClient from '../components/sales/SalesClient';
import SalesPerfil from '../components/sales/SalesPerfil';
import SalesProduct from '../components/sales/SalesProduct';

function Sales() {
  const employeeName = localStorage.getItem('employeeName') || 'Funcionário';

  const [salesData, setSalesData] = useState([]); // Inicializa com um array vazio para vendas
  const [groupedProducts, setGroupedProducts] = useState([]);

  const handleNewSale = (saleData: { cartItems: any[]; totalValue: number }) => {
    setSalesData((prevSales) => [...prevSales, saleData]); // Adiciona a nova venda à lista de vendas

    // Atualiza os produtos vendidos agrupados
    const updatedGroupedProducts = saleData.cartItems.reduce((acc: any[], item: { name: any; quantity: any; }) => {
      const existingProduct = acc.find((prod: { name: any; }) => prod.name === item.name);
      if (existingProduct) {
        existingProduct.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, [...groupedProducts]);

    setGroupedProducts(updatedGroupedProducts);
  };

  const [openCashDialog, setOpenCashDialog] = useState(false);

  const handleOpenCash = () => setOpenCashDialog(true);
  const handleCloseCash = () => setOpenCashDialog(false);
  const handleConfirmOpenCash = (initialCash: any) => {
    console.log(`Caixa aberto com valor inicial de R$ ${initialCash}`);
    setOpenCashDialog(false);
  };

  // Calcular o total de vendas do dia
  const totalSales = salesData.reduce((acc, sale) => acc + sale.totalValue, 0);

  return (
    <>
      {/* Barra Superior */}
      <ToobarSuperior />

      {/* Conteúdo Principal da Página Sales */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          marginTop: '64px',
        }}
      >
        {/* Conteúdo Principal dividido em três blocos */}
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto' }}>
          {/* Bloco 1 - Perfil do Funcionário */}
          <SalesPerfil
            employeeName={employeeName}
            onOpenCash={handleOpenCash}
            onNewSale={handleNewSale} // Adiciona a função para receber uma nova venda
          />

          {/* Bloco 2 - Vendas do Dia */}
          <SalesClient salesData={salesData} />

          {/* Bloco 3 - Produtos Vendidos */}
          <SalesProduct salesData={groupedProducts} /> {/* Atualiza para usar salesData */}
        </Box>

        {/* Componente para "Abrir Caixa" */}
        <OpenCashDialog open={openCashDialog} onClose={handleCloseCash} onConfirm={handleConfirmOpenCash} />

        {/* Footer */}
        <Footer totalSales={totalSales} /> {/* Passa o totalSales para o Footer */}
      </Box>
    </>
  );
}

export default Sales;
