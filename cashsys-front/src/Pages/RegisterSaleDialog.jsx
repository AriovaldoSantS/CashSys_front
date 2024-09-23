import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types'; // Adicionando PropTypes
import { useEffect, useState } from 'react';

function RegisterSaleDialog({ open, onClose, onRegister }) {
  // Definir os produtos e preços fixos
  const productsList = [
    { name: 'Xerox', price: 0.30 },
    { name: 'Impressão', price: 2.00 },
    { name: 'Quadro 10x15', price: 17.00 },
    { name: 'Foto 10x15', price: 5.00 },
    { name: 'Foto 3x4', price: 17.00 },
    { name: 'DIG', price: null }, // Produto com preço aberto
  ];

  const [selectedProduct, setSelectedProduct] = useState(productsList[0]); // Produto selecionado
  const [quantity, setQuantity] = useState(1);
  const [manualPrice, setManualPrice] = useState(0); // Para o produto DIG
  const [amountPaid, setAmountPaid] = useState(0); // Valor pago pelo cliente
  const [change, setChange] = useState(0); // Troco
  const [products, setProducts] = useState([]); // Lista de produtos adicionados
  const [totalAmount, setTotalAmount] = useState(0); // Total de todos os produtos

  // Novos detalhes
  const [customerName, setCustomerName] = useState(''); // Nome do cliente
  const [paymentMethod, setPaymentMethod] = useState('dinheiro'); // Método de pagamento

  useEffect(() => {
    if (open) {
      setSelectedProduct(productsList[0]);
      setQuantity(1);
      setManualPrice(0);
      setProducts([]);
      setTotalAmount(0);
      setAmountPaid(0);
      setChange(0);
      setCustomerName('');
      setPaymentMethod('dinheiro');
    }
  }, [open]); // Removido 'productsList' do array de dependências

  // Função para adicionar um produto à lista
  const handleAddProduct = () => {
    let price = selectedProduct.price;
    if (selectedProduct.name === 'DIG') {
      price = manualPrice;
    }

    const newProduct = {
      name: selectedProduct.name,
      quantity,
      amount: price,
      total: price * quantity,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setTotalAmount((prevTotal) => prevTotal + newProduct.total);

    // Resetar valores após adicionar o produto
    setSelectedProduct(productsList[0]);
    setQuantity(1);
    setManualPrice(0);
  };

  // Função para calcular o troco
  const handleCalculateChange = () => {
    const calculatedChange = amountPaid - totalAmount;
    setChange(calculatedChange >= 0 ? calculatedChange : 0); // Não permite troco negativo
  };

  // Registrar a venda com todos os detalhes
  const handleRegister = () => {
    const sale = {
      customerName,
      paymentMethod,
      totalAmount,
      products,
      amountPaid,
      change,
      date: new Date().toLocaleString(), // Adicionando data e hora
    };
    onRegister(sale);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registrar Venda</DialogTitle>
      <DialogContent>

        {/* Nome do Cliente */}
        <TextField
          label="Nome do Cliente"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        {/* Método de Pagamento */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Método de Pagamento</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
            <MenuItem value="cartao_credito">Cartão de Crédito</MenuItem>
            <MenuItem value="cartao_debito">Cartão de Débito</MenuItem>
            <MenuItem value="pix">Pix</MenuItem>
          </Select>
        </FormControl>

        {/* Seleção de Produto */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Produto</InputLabel>
          <Select
            value={selectedProduct.name}
            onChange={(e) => {
              const product = productsList.find((p) => p.name === e.target.value);
              setSelectedProduct(product);
            }}
          >
            {productsList.map((product) => (
              <MenuItem key={product.name} value={product.name}>
                {product.name} - {product.price !== null ? `R$ ${product.price.toFixed(2)}` : 'Preço em aberto'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Definir preço manual para o produto DIG */}
        {selectedProduct.name === 'DIG' && (
          <TextField
            type="number"
            label="Valor Unitário (R$)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={manualPrice}
            onChange={(e) => setManualPrice(parseFloat(e.target.value) || 0)}
          />
        )}

        <TextField
          type="number"
          label="Quantidade"
          variant="outlined"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />

        <Button variant="contained" onClick={handleAddProduct} fullWidth>
          Adicionar Produto
        </Button>

        {/* Lista de produtos adicionados */}
        <Typography variant="h6" marginTop="1rem">
          Produtos Adicionados:
        </Typography>
        <List>
          {products.map((p, index) => (
            <ListItem key={index}>
              {p.name} - {p.quantity} x R$ {p.amount.toFixed(2)} = R$ {p.total.toFixed(2)}
            </ListItem>
          ))}
        </List>

        {/* Valor total */}
        <Typography variant="h6" marginTop="1rem">
          Valor Total: R$ {totalAmount.toFixed(2)}
        </Typography>

        {/* Campo para inserir o valor pago pelo cliente */}
        <TextField
          type="number"
          label="Valor Recebido (R$)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={amountPaid}
          onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
        />
        <Button variant="contained" onClick={handleCalculateChange} fullWidth>
          Calcular Troco
        </Button>

        {/* Exibir o troco */}
        <Typography variant="body1" gutterBottom>
          Troco: R$ {change.toFixed(2)}
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleRegister} variant="contained" color="primary">
          Registrar Venda
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Definindo PropTypes para validar as props
RegisterSaleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default RegisterSaleDialog;
