import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Clients from './Pages/Clients';
import Login from './Pages/Login';
import Report from './Pages/Report';
import Sales from './Pages/Sales';
import Stock from './Pages/Stock';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verifica se há um token de autenticação no localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Função para controlar autenticação
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Salva a autenticação no localStorage
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Função para logout (pode ser adicionada à barra superior)
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Routes>
          {/* Rota de Login */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/sales" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />

          {/* Rotas protegidas */}
          {isAuthenticated ? (
            <>
              <Route path="/sales" element={<Sales />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/report" element={<Report />} />
              <Route path="/clients" element={<Clients />} />
            </>
          ) : (
            // Redirecionar para login se não autenticado
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
