import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

// Interface para os produtos vendidos
interface Product {
  productName: string;
  quantity: number;
}

// Interface para as props do componente
interface SalesProductProps {
  salesData: Array<{ cartItems: Array<{ name: string; quantity: number }> }>; // Ajuste aqui
}

function SalesProduct({ salesData }: SalesProductProps) {
  const [productSummary, setProductSummary] = useState<Product[]>([]);

  // Atualizar o resumo dos produtos vendidos
  useEffect(() => {
    // Verifica se salesData possui dados válidos
    if (!salesData || salesData.length === 0) {
      setProductSummary([]);
      return;
    }

    // Agrupar produtos por nome e calcular a quantidade total vendida de cada um
    const productMap: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      sale.cartItems.forEach((item) => { // Itera sobre os produtos na venda
        if (item.name && typeof item.quantity === 'number') {
          if (productMap[item.name]) {
            productMap[item.name] += item.quantity;
          } else {
            productMap[item.name] = item.quantity;
          }
        }
      });
    });

    // Cria um array a partir do mapa de produtos com o nome e quantidade
    const summarizedProducts = Object.keys(productMap).map((productName) => ({
      productName,
      quantity: productMap[productName],
    }));

    // Atualiza o estado com o resumo dos produtos
    setProductSummary(summarizedProducts);
  }, [salesData]);

  return (
    <Box
      sx={{
        flex: 1,
        padding: '16px',
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Produtos Vendidos
      </Typography>

      {/* Lista de Produtos Vendidos com visualização intercalada */}
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {productSummary.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '16px' }}>
            Nenhum produto vendido
          </Typography>
        ) : (
          productSummary.map((product, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f0f0f0',
                }}
              >
                <ListItemText
                  primary={product.productName}
                  secondary={`Quantidade: ${product.quantity}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  );
}

export default SalesProduct;
