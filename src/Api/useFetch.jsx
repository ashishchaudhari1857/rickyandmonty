import React, { useCallback, useState, useEffect } from 'react';

function useFetch(url, fullUrl) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const URL = url.length !== 0 ? `https://rickandmortyapi.com/api/${url}` : fullUrl;
  console.log(URL)

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }

      const fetchedData = await res.json();
      setData(fetchedData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }, [URL]);

  useEffect(() => {
    fetchCharacters();
  }, [URL, fetchCharacters]);

  return { data, error, loading };
}

export default useFetch;
