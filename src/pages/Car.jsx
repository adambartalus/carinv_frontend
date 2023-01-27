import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getCar, deleteCar } from '../fetch/fetchCars';
import UpdateCarDialog from "../components/UpdateCarDialog";
import DeleteCarDialog from "../components/DeleteCarDialog";
import { addMessage } from "../snackbarMessagesSlice";
import { useDispatch } from "react-redux";
import { IconButton, Skeleton, Stack, Tooltip, Typography } from "@mui/material";


const Car = props => {
  const [car, setCar] = useState({});
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateQuantity = (newQuantity) => {
    setUpdateDialogOpen(false);
    fetch(`http://localhost:8080/cars/${params.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        make: car.make.name,
        model: car.model,
        modelYear: car.modelYear,
        quantity: newQuantity,
      }),
    }).then(response => {
      if (!response.ok) throw response;
      dispatch(addMessage({
        message: `The quantity of ${car.modelYear + ' ' + car.make.name + ' ' + car.model} has been successfully updated`,
        title: 'Update car',
        severity: 'success'
      }))
    }).then(() => {
      setLoading(true);
      getCar(params.id).then(data => {
        setCar({ ...data });
      }).catch(error => {
        navigate('/');
      }).finally(() => {
        setLoading(false);
      });
    }).catch(async error => {
      const data = await error.json();
      dispatch(addMessage({
        message: data.errors.quantity,
        title: 'Update car',
        severity: 'error'
      }));
    });
  }

  const handleDelete = event => {
    deleteCar(params.id)
      .then(response => {
        if (!response.ok) throw response;

        const message = `The car ${car.modelYear + ' ' + car.make.name + ' ' + car.model} has been successfully deleted`;
        dispatch(addMessage({
          message: message,
          title: 'Delete car',
          severity: 'success'
        }));
        navigate('/cars');
      }).catch(error => {

      })
  }

  useEffect(() => {
    getCar(params.id)
      .then(data => {
        setCar({ ...data });
      }).catch(error => {
        dispatch(addMessage({
          message: 'The car was not found',
          severity: 'error'
        }));
        navigate('/cars');
      }).finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  return (
    <Paper sx={{
      m: 3,
      p: 1,
    }}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <IconButton component={Link} to='/cars'>
          <ArrowBackIcon />
        </IconButton>
        <div>
          <Tooltip title='Update'>
            <IconButton onClick={e => setUpdateDialogOpen(true)} >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton onClick={() => setDeleteDialogOpen(true)} >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      </Stack>
      <Typography variant="h4" py={1} px={2}>
        {loading ?
          <Skeleton /> :
          car.modelYear + ' ' + car.make?.name + ' ' + car.model
        }
      </Typography>
      {loading ?
        <Skeleton variant="rectangular" height='12rem'/> :
        <>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component='th' width='50%'>
                    Model year
                  </TableCell>
                  <TableCell>
                    {car.modelYear}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component='th'>
                    Make
                  </TableCell>
                  <TableCell>
                    {car.make?.name}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component='th'>
                    Model
                  </TableCell>
                  <TableCell>
                    {car.model}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component='th'>
                    Quantity
                  </TableCell>
                  <TableCell>
                    {car.quantity}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <UpdateCarDialog
            open={updateDialogOpen}
            quantity={car.quantity}
            onClose={e => setUpdateDialogOpen(false)}
            onSubmit={updateQuantity}
          />
          <DeleteCarDialog
            car={car}
            open={deleteDialogOpen}
            onClose={e => setDeleteDialogOpen(false)}
            onDelete={handleDelete}
          />
        </>
      }
    </Paper>
  );
}

export default Car;
