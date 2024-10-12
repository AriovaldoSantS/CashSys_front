import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

// Props para passar dados das vendas e funções de controle
interface CancelSaleDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (saleId: number) => void;
  salesData: { id: number; productName: string; quantity: number; price: number }[];
}

const CancelSaleDialog: React.FC<CancelSaleDialogProps> = ({ open, onClose, onConfirm, salesData }) => {
  const [selectedSale, setSelectedSale] = useState<number | ''>('');

  const handleConfirm = () => {
    if (selectedSale) {
      onConfirm(selectedSale);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cancelar Venda</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="select-sale-label">Selecione a Venda</InputLabel>
          <Select
            labelId="select-sale-label"
            value={selectedSale}
            onChange={(e) => setSelectedSale(e.target.value as number)}
            label="Selecione a Venda"
          >
            {salesData.map((sale) => (
              <MenuItem key={sale.id} value={sale.id}>
                {`Venda ${sale.id} - ${sale.productName} - R$ ${(sale.price * sale.quantity).toFixed(2)}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirmar Cancelamento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelSaleDialog;
