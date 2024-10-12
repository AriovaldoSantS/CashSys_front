import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface CloseCashDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (closingCash: string) => void;
  totalSales: number;
}

const CloseCashDialog: React.FC<CloseCashDialogProps> = ({ open, onClose, onConfirm, totalSales }) => {
  const [closingCash, setClosingCash] = useState('');

  const handleConfirm = () => {
    onConfirm(closingCash);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Fechar Caixa</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{`Total de vendas: R$ ${totalSales.toFixed(2)}`}</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Valor no Caixa"
          type="number"
          fullWidth
          value={closingCash}
          onChange={(e) => setClosingCash(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirmar Fechamento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseCashDialog;
