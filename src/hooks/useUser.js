export const useUser = () => {

  return JSON.parse(localStorage.getItem('user'));
}