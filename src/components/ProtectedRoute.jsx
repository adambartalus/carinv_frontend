import { Navigate, useLocation } from 'react-router-dom';

import { useCurrentUser } from '../hooks/useCurrentUser';

export const ProtectedRoute = ({ element }) => {
  const loc = useLocation().pathname;
  const user = useCurrentUser();
  if(!user) {
    localStorage.setItem('next', loc);
    return <Navigate to='/login'/>
  }
  return element;
};