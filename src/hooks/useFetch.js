import { useState } from 'react';

function useFetch() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const makeFetch = async (value, type) => {
    if (type === 'f' && value.length >= 2) {
      return global.alert('Your search must have only 1 (one) character');
    }

    setIsLoading(true);
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    const customUrl = `${url}${type}=${value}`;
    fetch(customUrl)
      .then((response) => response.json())
      .then((result) => setData(result));
    setIsLoading(false);
  };

  return [data, isLoading, makeFetch];
}

export default useFetch;
