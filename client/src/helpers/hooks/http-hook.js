import { useState, useCallback } from 'react';

// name must contain use at the beginning - rule of hooks
export const useHttpClient = () => {
  // for managing loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // function w/t default param
  // useCallback  - don't allow recreate this func when component that uses this hook renders
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
