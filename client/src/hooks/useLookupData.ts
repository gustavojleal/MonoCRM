import { useState, useEffect } from 'react';

const CACHE_PREFIX = 'app_lookup_';

export const useLookupData = <T = any>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `${CACHE_PREFIX}${endpoint.replace(/\//g, '_')}`;
      
      try {
        if (window.__LOOKUP_CACHE[cacheKey] && window.__LOOKUP_CACHE[cacheKey]){
          setData(window.__LOOKUP_CACHE[cacheKey]);
          setLoading(false);
          return;
        }

        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          window.__LOOKUP_CACHE[cacheKey] = parsed;
          setData(parsed);
          setLoading(false);
          return;
        }

        setLoading(true);
        const response = await fetch(`/api/lookup${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const result: T = await response.json();
        
        window.__LOOKUP_CACHE[cacheKey] = result;
        sessionStorage.setItem(cacheKey, JSON.stringify(result));
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};