import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

const API_URL = 'http://localhost:8080/api/auth/verify-email';

const EmailVerification = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    fetch(API_URL, {
      method: 'POST',
      body: token
    }).then(response => {
      if (response.ok) {
        setSuccessful(true);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>Loading...</h1>

  return (
    <>
      {successful ?
        <h1>You have successfully verified your email</h1> :
        <h1>There was an error</h1>
      }
    </>
  )
}

export default EmailVerification;
