import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <p>Главная (защищено)</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}