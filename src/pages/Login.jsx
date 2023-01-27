import { useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

import { loginThunk } from '../authSlice';

const Login = props => {
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const loading = useSelector(state => state.auth.logging);

  const [feedback, setFeedback] = useState();

  const { state } = useLocation();

  const next = useRef(localStorage.next);
  localStorage.removeItem('next');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = event => {
    setInputs(prevInputs => ({ ...prevInputs, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginThunk({ usernameOrEmail: inputs.username, password: inputs.password }))
      .then(e => {
        if (e.meta.requestStatus === 'fulfilled') {
          navigate(next.current || '/');
        } else if (e.meta.requestStatus === 'rejected') {
          if (e.error.name === 'TypeError') {
            setFeedback({
              text: 'No response from the server',
              severity: 'warning'
            });
          } else {
            setFeedback({
              text: 'Invalid username or password',
              severity: 'error',
            });
          }
        }
      });
  }

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        {feedback &&
          <Alert
            sx={{
              mb: 2 
            }}
            id='alert'
            severity={feedback.severity}
            variant='filled'
            onClose={() => setFeedback(null)}
          >
            {feedback.text}
          </Alert>
        }
        <Typography align='center' variant='h4' mb={2}  >Login</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack spacing={1} direction='row' alignItems='center' >
              <AccountCircleIcon />
              <TextField
                fullWidth
                label="Username/email"
                variant='filled'
                name='username'
                value={inputs.username}
                onChange={handleInputChange}
              />
            </Stack>

            <Stack spacing={1} direction='row' alignItems='center' >
              <LockIcon />
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant='filled'
                name='password'
                value={inputs.password}
                onChange={handleInputChange}
              />
            </Stack>
            <Button
              fullWidth
              disabled={loading}
              variant='contained'
              size='large'
              type='submit'
            >
              {loading ?
                <CircularProgress /> :
                'Log in'
              }
            </Button>
          </Stack>
        </form>
        <Divider sx={{ marginBottom: '1rem' }} />
        <Typography align='center'>
          Don't have an account yet? <Link to='/signup' >Sign up.</Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default Login;
