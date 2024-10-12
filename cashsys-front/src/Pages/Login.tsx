import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { default as React, useState } from 'react';
import logo from '../img/logo.png';

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
    <Grid container sx={{ height: '100vh', backgroundColor: '#000' }}>
      {/* Caixa de Login à Esquerda */}
      <Grid
        item xs={12} md={6}
        container justifyContent="center" alignItems="center"
        sx={{ color: '#FFF' }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: '#fff',
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#000' }}>
            Login
          </Typography>
          {error && (
            <Alert severity="warning" style={{ color: '#000' }}>
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
            fullWidth
            onClick={handleLogin}
            sx={{
              marginTop: '16px',
              backgroundColor: '#FF0000', // Botão vermelho
              '&:hover': { backgroundColor: '#cc0000' }, // Vermelho mais escuro ao passar o mouse
            }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Container>
      </Grid>

      {/* Logo da Empresa à Direita */}
      <Grid 
        item xs={12} md={6} 
        container justifyContent="center" alignItems="center"
        sx={{ backgroundColor: '#000' }} // Adicionando o fundo preto para a seção da logo
      >
        <img
          src={logo}
          alt="Logo da Empresa"
          style={{ maxWidth: '60%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
}

export default Login;
