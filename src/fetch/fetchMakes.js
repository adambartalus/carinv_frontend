const API_URL = 'http://localhost:8080/api/makes';

export const getMakes = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw response;
  return response.json();
}
