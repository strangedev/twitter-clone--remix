import { useEffect } from 'react';
import { useNavigate } from 'remix'
import { destroySession } from '../auth/storage';

export default function Logout () {
  const navigate = useNavigate();

  useEffect(() => {
    destroySession();
    navigate('/');
  }, []);

  return null;
};