import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { authApi } from '../assets/api/auth';
import type { UserProfile } from '../assets/api/types';

export function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    authApi
      .getProfile()
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err.response?.data?.message ?? 'Не удалось загрузить профиль');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (loading) return <p>Загрузка профиля...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return null;

  return (
    <div>
      <h1>Профиль</h1>
      <p>
        {profile.surname} {profile.firstName} {profile.patronymic}
      </p>
      <ul>
        <li>ID: {profile.id}</li>
        <li>Логин: {profile.username}</li>
        <li>Email: {profile.email}</li>
        <li>Создан: {profile.createDate}</li>
      </ul>

      <h2>Роли</h2>
      <ul>
        {profile.authorities.map((a) => (
          <li key={a.id}>{a.name} ({a.code})</li>
        ))}
      </ul>

      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}