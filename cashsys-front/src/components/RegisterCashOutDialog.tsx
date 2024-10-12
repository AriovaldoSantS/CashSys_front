import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

interface RegisterCashOutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (cashOut: string, reason: string) => void;
}

const RegisterCashOutDialog: React.FC<RegisterCashOutDialogProps> = ({ open, onClose, onConfirm }) => {
  const [cashOut, setCashOut] = useState('');
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(cashOut, reason);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registrar Saída de Caixa</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Valor de Saída"
          type="number"
          fullWidth
          value={cashOut}
          onChange={(e) => setCashOut(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Motivo"
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirmar Saída
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterCashOutDialog;
