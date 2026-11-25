import { useEffect, useState } from 'react';

export function useStorageRefresh() {
  const [, refresh] = useState(0);
  useEffect(() => {
    const update = () => refresh(current => current + 1);
    window.addEventListener('altoque_storage_update', update);
    return () => window.removeEventListener('altoque_storage_update', update);
  }, []);
}
