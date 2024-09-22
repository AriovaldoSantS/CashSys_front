import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams(); // Pegar o token da URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setMessage('As senhas não coincidem');
    }

    try {
      const response = await axios.post(`/reset-password/${token}`, { newPassword });
      setMessage(response.data.message);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Erro ao redefinir a senha');
    }
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Nova Senha:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        <label>Confirmar Nova Senha:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button type="submit">Redefinir Senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
