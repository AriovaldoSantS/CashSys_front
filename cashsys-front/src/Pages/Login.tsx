import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

// Tipagem das props
interface LoginProps {
  onLoginSuccess: (employeeName: string) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = () => {
    // Verifica se os campos não estão vazios
    if (!username || !password) {
      setError('Nome do funcionário e senha são obrigatórios');
      return;
    }

    // Inicia o processo de login
    setLoading(true);
    setError('');

    // Envia a requisição para o backend para autenticar
    axios
      .post('http://localhost:3000/api/usuarios/login', {
        nome: username,
        senha: password,
      })
      .then((response) => {
        console.log('Login bem-sucedido:', response.data);
        setLoading(false);
        
        // Extrai o nome do funcionário retornado na resposta
        const employeeName = response.data.employeeName;
        localStorage.setItem('employeeName', response.data.employeeName);

        onLoginSuccess(employeeName); // Passa o nome do funcionário como argumento
      })
      .catch((err) => {
        // Captura a mensagem de erro, se disponível
        const errorMessage = err.response && err.response.data ? err.response.data : 'Erro desconhecido';
        console.error('Erro ao fazer login:', errorMessage);
        setError('Funcionário ou senha incorretos'); // Mensagem mais clara para o usuário
        setLoading(false);
      });
  };

   const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" style={{ marginBottom: '16px' }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Funcionário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        onKeyPress={handleKeyPress}
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        style={{ marginTop: '16px' }}
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </Container>
  );
}

export default Login;
