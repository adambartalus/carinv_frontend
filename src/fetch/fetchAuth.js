const LOGIN_API = "http://localhost:8080/api/auth/login";
const LOGOUT_API = "http://localhost:8080/api/auth/logout";
const SIGNUP_API = "http://localhost:8080/api/auth/signup";

export const login = async (username, password) => {
  return fetch(LOGIN_API, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usernameOrEmail: username,
      password: password,
    })
  });
}

export const logout = async () => {
  return fetch(LOGOUT_API, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
}

export const signup = async (username, email, password, confirmPassword, country) => {
  return fetch(SIGNUP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      country: country
    })
  })
}
