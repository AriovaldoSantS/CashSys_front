import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Clients from './Pages/Clients';
import Finance from './Pages/Finance';
import Login from './Pages/Login';
import Report from './Pages/Report';
import Sales from './Pages/Sales';
import Stock from './Pages/Stock';
import Support from './Pages/Support';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Função chamada ao fazer login com sucesso
  const handleLoginSuccess = (employeeName: string) => {
    console.log('Usuário autenticado:', employeeName);
    setIsAuthenticated(true);
    // Salva a autenticação no localStorage
    localStorage.setItem('isAuthenticated', 'true');
  };

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Routes>
          {/* Rota de Login */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/sales" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
            }
          />

          {/* Rotas Protegidas */}
          <Route
            path="/sales"
            element={
              isAuthenticated ? <Sales /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/stock"
            element={
              isAuthenticated ? <Stock /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/report"
            element={
              isAuthenticated ? <Report /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/clients"
            element={
              isAuthenticated ? <Clients /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/finance"
            element={
              isAuthenticated ? <Finance /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/support"
            element={
              isAuthenticated ? <Support /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
