import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

import AsynchronousAutocomplete from '../components/AsyncAutocomplete';
import { getCountries } from '../fetch/fetchCountries';
import { signup } from '../fetch/fetchAuth';
import { InputAdornment } from '@mui/material';


const Signup = () => {
  const [inputs, setInputs] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState();

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputs(values => ({ ...values, [event.target.name]: event.target.value }));
  };
  const handleCountryChange = (event, newCountry) => {
    setInputs(prev => ({ ...prev, country: newCountry }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    signup(inputs.username, inputs.email, inputs.password, inputs.confirmPassword, inputs.country?.name)
      .then(response => {
        if (!response.ok) throw response;
        navigate('/login', { state: { feedback: "You have successfully signed up. You can log in now.", severity: "success" } });
      }).catch(error => {
        if (!error.status) {
          setFeedback({ text: 'No response from the server', severity: 'error' });
          return;
        }
        if (409 === error.status) {
          setFeedback({ text: 'The username or email is taken', severity: 'error' });
          setErrors({});
          return;
        }
        error.json().then(data => {
          setErrors({ ...data.errors })
        })
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        {feedback &&
          <Alert
            id='alert'
            severity={feedback.severity}
            variant='filled'
            onClose={() => setFeedback(null)}
          >
            {feedback.text}
          </Alert>
        }
        <Typography align='center' variant='h4' mb={2} >Sign up</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
              <TextField
                fullWidth
                label="Username"
                variant='filled'
                name='username'
                value={inputs.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><PersonIcon /></InputAdornment>
                }}
              />
              
              <TextField
                fullWidth
                label="Email"
                variant='filled'
                name='email'
                value={inputs.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><EmailIcon /></InputAdornment>
                }}
              />

              
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant='filled'
                name='password'
                value={inputs.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><LockIcon /></InputAdornment>
                }}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm password"
                variant='filled'
                name='confirmPassword'
                value={inputs.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.PasswordMatch}
                helperText={errors.PasswordMatch}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><KeyIcon /></InputAdornment>
                }}
              />
              <AsynchronousAutocomplete
                onChange={handleCountryChange}
                fetchOptions={getCountries}
                getOptionLabel={option => option.name ?? option}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sortOptions={(a, b) => {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                }}
                value={inputs.country || null}
                TextFieldProps={{
                  label: 'Country',
                  variant: 'filled',
                  error: !!errors.country,
                  helperText: errors.country,
                  InputProps:{
                    startAdornment: <InputAdornment variant='outlined' position='start'><LanguageIcon /></InputAdornment>
                  }
                }}
              />
            <Button
              fullWidth
              disabled={loading}
              variant='contained'
              size='large'
              type='submit'
            >
              {loading ?
                <CircularProgress /> :
                'Sign up'
              }
            </Button>
          </Stack>
        </form>
        <Divider sx={{ marginBottom: '1rem' }} />
        <Typography align='center'>
          Already have an account? <Link to='/login'>Log in.</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Signup;
