import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Função para capturar o login
  const handleLogin = () => {
    if (username && password) {
      // Redirecionar para a página de vendas e passar o nome do funcionário
      navigate('/sales', { state: { employeeName: username } });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* Ícone de câmera do Material UI */}
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '40px' }}>
        Nova Foto Ideal
      </Typography>

      {/* Área de login */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '300px' }}>
        <TextField
          label="Nome do Funcionário"
          fullWidth
          margin="normal"
          onChange={(e) => setUsername(e.target.value)} // Armazenar o nome digitado
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)} // Armazenar a senha digitada
        />
        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: '20px' }}>
          Entrar
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
