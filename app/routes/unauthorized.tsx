import { useEffect, useState } from 'react';
import { useNavigate } from 'remix';

export default function Unauthorized () {
  const navigate = useNavigate();
  const [ countDown, setCountDown ] = useState<number>(5);

  useEffect(() => {
    if (countDown === 0) {
      return navigate('/logout?redirect=/login');
    }

    setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1_000);
  }, [ countDown ]);

  return (
    <div>
      Your session has expired. You're being logged out in { countDown } seconds...
    </div>
  );
};
