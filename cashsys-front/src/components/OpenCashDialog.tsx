import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface OpenCashDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (initialCash: string) => void;
}

function OpenCashDialog({ open, onClose, onConfirm }: OpenCashDialogProps) {
  const [initialCash, setInitialCash] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [fixedTime, setFixedTime] = useState<Date | null>(null);

  // Nome do funcionário capturado do localStorage
  const employeeName = localStorage.getItem('employeeName') || 'Funcionário';

  // Captura a data e hora atuais no momento de abertura do caixa
  React.useEffect(() => {
    if (open && !fixedTime) {
      setFixedTime(new Date());
    }
  }, [open]);

  // Função para confirmar o valor inicial do caixa
  const handleConfirm = () => {
    setConfirmation(true);
  };

  // Função para confirmar a abertura do caixa após a pergunta final
  const handleFinalConfirm = () => {
    const data = {
      funcionario: employeeName,
      valor_inicial: initialCash,
    };

    fetch('http://localhost:3000/caixa/abrir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
        onConfirm(initialCash);  // Mantém o comportamento do frontend
        // Atualiza a página inteira após a confirmação
        window.location.reload();  // Atualiza a página para garantir que as novas informações sejam carregadas
      })
      .catch((error) => {
        console.error('Erro ao abrir o caixa:', error);
      });

    setInitialCash('');
    setConfirmation(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Faixa no topo */}
      <Box sx={{ backgroundColor: '#000', color: '#FFF', padding: '8px', textAlign: 'center' }}>
        <Typography variant="h6">Abertura de Caixa</Typography>
      </Box>
      
      <DialogContent>
        {/* Nome do funcionário e data/hora */}
        <Box sx={{ marginBottom: '16px' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Funcionário: {employeeName}
          </Typography>
          {fixedTime && (
            <Typography variant="body2">
              Data: {fixedTime.toLocaleDateString()} - Hora: {fixedTime.toLocaleTimeString()}
            </Typography>
          )}
        </Box>

        {/* Campo para valor inicial */}
        {!confirmation ? (
          <>
            <DialogContentText>
              Informe o valor inicial do caixa:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Valor Inicial"
              type="number"
              fullWidth
              value={initialCash}
              onChange={(e) => setInitialCash(e.target.value)}
            />
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleConfirm} color="primary">
                Confirmar Abertura de Caixa
              </Button>
            </DialogActions>
          </>
        ) : (
          // Pergunta final de confirmação
          <>
            <DialogContentText>
              {`${employeeName}, tem certeza que deseja abrir o caixa com R$ ${initialCash}?`}
            </DialogContentText>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Não
              </Button>
              <Button onClick={handleFinalConfirm} color="primary">
                Sim, abrir o caixa
              </Button>
            </DialogActions>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OpenCashDialog;
