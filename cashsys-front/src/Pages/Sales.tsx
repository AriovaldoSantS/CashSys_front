import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ContentArea from '../components/ContentArea';
import Sidebar from '../components/Sidebar';
import ToobarSuperior from '../components/ToobarSuperior';

function Sales() {
  const [sales, setSales] = useState([
    { productName: 'Produto 1', quantity: 2, price: 10 },
    { productName: 'Produto 2', quantity: 1, price: 20 },
    { productName: 'Produto 3', quantity: 5, price: 5 },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const employeeName = "Soberano"; // Nome do funcionário

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calcula o total das vendas
  const totalSales = sales.reduce((acc, sale) => acc + sale.quantity * sale.price, 0);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Barra Superior */}
      <ToobarSuperior employeeName={employeeName} currentTime={currentTime} onLogout={handleLogout} />

      {/* Conteúdo Principal */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar employeeName={employeeName} />
        <ContentArea sales={sales} totalSales={totalSales} />
      </Box>
    </Box>
  );
}

export default Sales;
