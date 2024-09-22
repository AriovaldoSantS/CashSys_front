import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPanel from './Pages/AdminPanel.jsx';
import Login from './pages/Login';
import Sales from './pages/Sales';

function App() {
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Login é a página principal */}
        <Route path="/" element={<Login />} />

        {/* Exibir abas dinâmicas conforme o papel do usuário */}
        {userRole === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
        {userRole === 'vendedor' && <Route path="/sales" element={<Sales />} />}

        {/* Redireciona para login caso o usuário não esteja autenticado */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
