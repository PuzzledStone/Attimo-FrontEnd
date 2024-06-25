import { useState, useEffect } from 'react';

function useStatus(statusNumber) {
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    switch (statusNumber) {
      case 1:
        setStatusText('Active');
        break;
      case 2:
        setStatusText('Expired');
        break;
      case 3:
        setStatusText('Completed');
        break;
      default:
        setStatusText('Uknown');
        break;
    }
  }, [statusNumber]);

  return statusText;
}

export default useStatus;