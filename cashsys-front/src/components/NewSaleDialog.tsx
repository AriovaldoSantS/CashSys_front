import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

// Função para buscar produtos do banco de dados real
const fetchProductsFromDatabase = async () => {
  try {
    // Ajuste a URL para o endpoint real do seu backend
    const response = await fetch('http://localhost:3000/api/produtos'); 
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const data = await response.json();
    return data; // Certifique-se de que o formato corresponde a [{ id, nome, preco }]
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

function NewSaleDialog({ open, onClose, onConfirm }) {
  const [clientName, setClientName] = useState('');
  const [saleNumber, setSaleNumber] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState('');
  const [paidValue, setPaidValue] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [changeValue, setChangeValue] = useState(0);
  const [discountOrCoupon, setDiscountOrCoupon] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (open) {
      // Resetar todos os campos ao abrir uma nova venda
      setClientName('');
      setSelectedProduct('');
      setCartItems([]);
      setQuantity(1);
      setObservations('');
      setPaidValue('');
      setTotalValue(0);
      setChangeValue(0);
      setDiscountOrCoupon('');
      setPaymentMethod('');

      // Busca os produtos do banco de dados
      fetchProductsFromDatabase().then((fetchedProducts) => {
        setProducts(fetchedProducts);
      });
    }
  }, [open]);

  // Atualizar troco sempre que o valor pago ou total mudar
  useEffect(() => {
    const paid = Number(paidValue) || 0;
    if (paid >= totalValue) {
      setChangeValue(paid - totalValue);
    } else {
      setChangeValue(0);
    }
  }, [paidValue, totalValue]);

  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0) return;
    const product = products.find((p) => p.nome === selectedProduct);
    if (product) {
      setCartItems([...cartItems, { ...product, quantity }]);
      setTotalValue((prevTotal) => prevTotal + product.preco * quantity);
      setSelectedProduct('');
      setQuantity(1);
    }
  };

  const handleFinalizeSale = () => {
    const finalClientName = clientName || `Venda ${saleNumber}`;
    setSaleNumber((prev) => prev + 1);

    const finalSaleData = {
      clientName: finalClientName,
      cartItems,
      paidValue,
      totalValue,
      discountOrCoupon,
      paymentMethod,
      observations,
    };
    
    onConfirm(finalSaleData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#000', color: '#FFF', textAlign: 'center' }}>NOVA VENDA</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
          <TextField
            label="Cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            fullWidth
          />
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <Select
                fullWidth
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                displayEmpty
                renderValue={selectedProduct !== '' ? undefined : () => 'Produto'}
              >
                <MenuItem disabled value="">
                  Produto
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.nome}>
                    {product.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <IconButton color="primary" onClick={handleAddProduct}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box>
            {cartItems.map((item, index) => (
              <Grid container key={index} spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="body1">{item.nome}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">R$ {item.preco}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">{item.quantity} uni</Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <TextField
              label={`Total = R$ ${totalValue.toFixed(2)}`}
              disabled
              fullWidth
            />
            <TextField
              label="Pagou"
              type="number"
              value={paidValue}
              onChange={(e) => setPaidValue(e.target.value)}
              fullWidth
            />
            <Select
              fullWidth
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              displayEmpty
            >
              <MenuItem disabled value="">
                Método de Pagamento
              </MenuItem>
              <MenuItem value="pix">Pix</MenuItem>
              <MenuItem value="dinheiro">Dinheiro</MenuItem>
              <MenuItem value="credito">Crédito</MenuItem>
              <MenuItem value="debito">Débito</MenuItem>
            </Select>
            <TextField
              label={`Troco = R$ ${changeValue.toFixed(2)}`}
              disabled
              fullWidth
            />
            <Button variant="contained" sx={{ backgroundColor: '#000', color: '#FFF' }} onClick={handleFinalizeSale}>
              FINALIZAR VENDA
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default NewSaleDialog;
