import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AsynchronousAutocomplete from '../components/AsyncAutocomplete';
import { getMakes } from "../fetch/fetchMakes";

const AddCar = (props) => {

  const [inputs, setInputs] = useState({ model: "" });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [feedback, setFeedback] = useState();

  const navigate = useNavigate();

  const handleInputChange = event => {
    setInputs(values => ({ ...values, [event.target.name]: event.target.value }));
  }
  const handleMakeChange = (event, newMake) => {
    setInputs(values => ({ ...values, make: newMake?.name }));
  }

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        make: inputs.make,
        model: inputs.model,
        modelYear: inputs.modelYear,
        quantity: inputs.quantity
      })
    };
    fetch('http://localhost:8080/cars', requestOptions)
      .then(response => {
        if (!response.ok) throw response;
        return response.json();
      }).then(data => {
        navigate(`/cars/${data.id}`);
      }).catch(error => {
        if (!(error.status)) {
          setFeedback('No response from the server');
          return;
        }
        if (409 === error.status) {
          setFeedback('This car is already in the database');
          setErrors({});
          return;
        }
        error.json().then(data => {
          setErrors({ ...data.errors });
        });
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <Container maxWidth='sm' sx={{ p: 2 }}>
        <Paper sx={{
          p: 5,
        }}>
          {feedback &&
            <Alert
              severity='error'
              variant="filled"
              onClose={() => setFeedback(null)}
            >
              {feedback}
            </Alert>
          }
          <Typography align='center' variant="h4" mb={5} mx={{ xs: 1, md: 4 }} mt={4}>Add car</Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} >
              <AsynchronousAutocomplete
                onChange={handleMakeChange}
                value={inputs.make || null}
                fetchOptions={getMakes}
                sortOptions={(a, b) => {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                }}
                getOptionLabel={option => option.name ?? option}
                isOptionEqualToValue={(option, value) => option.name === value}
                TextFieldProps={{
                  label: 'Make',
                  error: !!errors.make,
                  helperText: errors.make,
                  variant: 'filled',
                }}
              />
              <TextField
                label="Model"
                fullWidth
                variant="filled"
                name="model"
                value={inputs.model}
                onChange={handleInputChange}
                error={!!errors.model}
                helperText={errors.model}
              />
              <TextField
                label="Model year"
                fullWidth
                variant="filled"
                name="modelYear"
                value={inputs.modelYear || ''}
                onChange={handleInputChange}
                error={!!errors.modelYear}
                helperText={errors.modelYear}
                inputProps={{
                  inputMode: 'numeric',
                  
                }}
              />
              <TextField
                fullWidth
                label="Quantity"
                variant="filled"
                name="quantity"
                value={inputs.quantity || ''}
                onChange={handleInputChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
              <Button type="submit" variant='contained' fullWidth>
                {loading ?
                  <CircularProgress /> :
                  'Add car'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </section>
  );
}
export default AddCar;
