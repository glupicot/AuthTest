import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { authApi, type EmployeeDto } from '../assets/api/auth';

export function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<EmployeeDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    authApi
      .getProfile()
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err: any) => {
        if (!cancelled) setError(err?.message ?? 'Не удалось загрузить профиль');
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

  const fio = [profile.surname, profile.firstName, profile.patronymic]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <h1>Профиль</h1>
      {fio && <p>{fio}</p>}

      <ul>
        <li>ID: {profile.id}</li>
        <li>Логин: {profile.username}</li>
        {profile.email && <li>Email: {profile.email}</li>}
        <li>Создан: {profile.createDate}</li>
        {profile.updateDate && <li>Обновлён: {profile.updateDate}</li>}
      </ul>

      {profile.authorities?.length ? (
        <>
          <h2>Доступы</h2>
          <ul>
            {profile.authorities.map((a) => (
              <li key={a.id}>{a.name} ({a.code})</li>
            ))}
          </ul>
        </>
      ) : null}

      {profile.groups?.length ? (
        <>
          <h2>Группы</h2>
          <ul>
            {profile.groups.map((g) => (
              <li key={g.id}>{g.name} ({g.code})</li>
            ))}
          </ul>
        </>
      ) : null}

      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}