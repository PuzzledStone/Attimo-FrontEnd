import { useState, useEffect } from 'react';

function useStatus(statusNumber) {
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    switch (statusNumber) {
      case 1:
        setStatusText('Activo');
        break;
      case 2:
        setStatusText('Expirado');
        break;
      default:
        setStatusText('Desconocido');
        break;
    }
  }, [statusNumber]);

  return statusText;
}

export default useStatus;