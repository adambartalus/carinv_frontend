const API_URL = 'http://localhost:8080/api/countries';

export const getCountries = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw response;
  return response.json();
}
