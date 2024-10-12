import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Footer({ totalSales }): React.JSX.Element { // Agora recebe totalSales como prop
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <Box
      sx={{
        height: '100px',
        backgroundColor: '#000',
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px', // Ajuste do padding para dar espaço à direita
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      {/* Nome e Contato */}
      <Typography variant="body1" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
        Ari Sant'S Dev
      </Typography>

      {/* Valor Total do Dia com Destaque */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Total do dia: R$ {totalSales.toFixed(2)} {/* Usando a prop totalSales */}
      </Typography>

      {/* Data e Hora */}
      <Box sx={{ marginRight: '16px' }}> {/* Adicionando espaço antes da data e hora */}
        <Typography variant="body2">
          {formattedDate} - {formattedTime}
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
