import { Container } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Sales from './Pages/Sales';

function App() {
  return (
    <Router>
      <Container maxWidth="md" style={{ paddingTop: '2rem' }}>
        <Routes>
          {/* Página de Login como página principal */}
          <Route path="/" element={<Login />} />
          
          {/* Página de Vendas */}
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
