import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, Menu, MenuItem, Select, MenuItem as SelectItem, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate para redirecionar após logout
import RegisterSaleDialog from '../Pages/RegisterSaleDialog';

function Sales() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegação após logout
  const { employeeName } = location.state || { employeeName: 'Funcionário' };

  const [openDialog, setOpenDialog] = useState(false);
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [openCash, setOpenCash] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openCashDialog, setOpenCashDialog] = useState(false);
  const [cashInput, setCashInput] = useState('');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); 
  const [logoutReason, setLogoutReason] = useState('Almoço'); // Inicializa com "Almoço"
  const [openDetailDialog, setOpenDetailDialog] = useState(false); // Novo pop-up para detalhamento

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenCash = () => {
    setOpenCashDialog(true);
  };

  const handleCloseCashDialog = () => {
    setOpenCashDialog(false);
  };

  const handleConfirmOpenCash = () => {
    setOpenCash(parseFloat(cashInput));
    setOpenCashDialog(false);
  };

  const handleDayDetails = () => {
    setOpenDetailDialog(true);
  };

  const getDetailedSales = () => {
    const productSummary = {};

    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        if (!productSummary[product.name]) {
          productSummary[product.name] = 0;
        }
        productSummary[product.name] += product.quantity;
      });
    });

    return Object.entries(productSummary)
      .map(([name, quantity]) => `${name} - ${quantity} unidades`)
      .join('\n');
  };

  const handleCloseCash = () => {
    const totalCash = openCash + totalSales;
    alert(`Fechamento do Caixa:\nValor de Abertura: R$ ${openCash.toFixed(2)}\nTotal de Vendas: R$ ${totalSales.toFixed(2)}\nTotal em Caixa: R$ ${totalCash.toFixed(2)}`);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    console.log(`Motivo do logout: ${logoutReason}`);
    setLogoutDialogOpen(false);
    navigate('/');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); 
  };

  return (
    <Box>
      <AppBar position="fixed" style={{ backgroundColor: 'black', width: '100%' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" style={{ color: 'white' }}>Nova Foto Ideal</Typography>
          <Typography variant="h6" style={{ color: 'white' }}>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
            <Typography variant="h6" style={{ color: 'white' }}>{employeeName}</Typography>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
              <LogoutIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Drawer variant="permanent" anchor="left" sx={{
        width: 240, flexShrink: 0, '& .MuiDrawer-paper': {
          marginTop: '64px', width: 240, boxSizing: 'border-box',
        },
      }}>
        <List>
          <ListItem button>
            <ListItemText primary="Página de Estoque" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Página de Vendas" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Relatório" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Clientes" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '240px', paddingTop: '80px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
          <Button variant="contained" sx={{ backgroundColor: '#B0B0B0', '&:hover': { backgroundColor: '#A0A0A0', transform: 'scale(1.05)', transition: '0.3s' }, }} onClick={handleOpenCash}>
            Abrir Caixa
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#B0B0B0', '&:hover': { backgroundColor: '#A0A0A0', transform: 'scale(1.05)', transition: '0.3s' }, }} onClick={() => setOpenDialog(true)}>
            Nova Venda
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#B0B0B0', '&:hover': { backgroundColor: '#A0A0A0', transform: 'scale(1.05)', transition: '0.3s' }, }} onClick={handleDayDetails}>
            Detalhamento do Dia
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#B0B0B0', '&:hover': { backgroundColor: '#A0A0A0', transform: 'scale(1.05)', transition: '0.3s' }, }} onClick={handleCloseCash}>
            Fechamento de Caixa
          </Button>
        </Box>

        <Typography variant="h6">Total do Dia: R$ {totalSales.toFixed(2)}</Typography>

        <RegisterSaleDialog open={openDialog} onClose={() => setOpenDialog(false)} onRegister={(sale) => {
          setSales((prevSales) => [...prevSales, sale]);
          setTotalSales((prevTotal) => prevTotal + sale.totalAmount);
          setOpenDialog(false);
          setSnackbarOpen(true); // Define o Snackbar para mostrar sucesso
        }} />

        <Dialog open={openCashDialog} onClose={handleCloseCashDialog}>
          <DialogTitle>Abrir Caixa</DialogTitle>
          <DialogContent>
            <DialogContentText>Informe quanto de dinheiro você está abrindo o caixa:</DialogContentText>
            <TextField autoFocus margin="dense" label="Valor de Abertura" type="number" fullWidth value={cashInput} onChange={(e) => setCashInput(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCashDialog}>Cancelar</Button>
            <Button onClick={handleConfirmOpenCash}>Confirmar</Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de Detalhamento do Dia */}
        <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)}>
          <DialogTitle>Detalhamento das Vendas do Dia</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Produtos vendidos no dia:
            </DialogContentText>
            <TextField
              multiline
              fullWidth
              rows={4}
              value={getDetailedSales()} 
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDetailDialog(false)}>Fechar</Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de Logout com motivo pré-selecionado */}
        <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
          <DialogTitle>Motivo do Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>Por favor, selecione o motivo do logout:</DialogContentText>
            <FormControl fullWidth>
              <InputLabel id="motivo-logout-label">Motivo</InputLabel>
              <Select
                labelId="motivo-logout-label"
                value={logoutReason}
                onChange={(e) => setLogoutReason(e.target.value)}
              >
                <SelectItem value="Almoço">Almoço</SelectItem>
                <SelectItem value="Fechamento">Fechamento</SelectItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutDialogOpen(false)}>Cancelar</Button>
            <Button onClick={confirmLogout}>Confirmar Logout</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} message="Venda registrada com sucesso!" />
      </Box>
    </Box>
  );
}

export default Sales;
