import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';

import DeleteCarDialog from './DeleteCarDialog';
import TablePaginationActions from './TablePaginationActions';
import { deleteCars, getCars } from '../fetch/fetchCars';
import { usePagination } from '../hooks/usePagination';
import { useOrdering } from '../hooks/useOrdering';
import { useDispatch } from 'react-redux';
import { addMessage } from '../snackbarMessagesSlice';
import { TableContainer } from '@mui/material';


const filterLabelMapping = {
  'make': 'Make',
  'model': 'Model',
  'minModelYear': 'Min model year',
  'maxModelYear': 'Max model year',
  'minQuantity': 'Min quantity',
  'maxQuantity': 'Max quantity'
}

export const CarTable = ({ filterOpen, setFilterOpen, filterOptions, ...props }) => {
  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState([]);

  const [count, setCount] = useState(0);
  const [limit, offset, setLimit, setOffset] = usePagination(5, 0);
  const [orderBy, order, sort] = useOrdering('modelYear', 'desc');

  const [loading, setLoading] = useState(true);
  const [failedToLoad, setFailedToLoad] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const controller = new AbortController();

  const scrollRef = useRef();

  const handleTableRowClick = (event, car) => {
    navigate('/cars/' + car.id, { state: { carName: `${car.modelYear} ${car.make.name} ${car.model}` } });
  }

  const handleChangePage = (event, newPage) => {
    setOffset(newPage * limit);
    scrollRef.current?.scrollIntoView();
  }

  const isSelected = (id) => {
    return selected.includes(id);
  }

  const handleChangeRowsPerPage = event => {
    setLimit(event.target.value);
    setOffset(0);
  }

  const handleSort = by => event => {
    sort(by);
  }

  const loadCars = async () => {
    setCars([]);
    setLoading(true);
    setFailedToLoad(false);
    try {
      const data = await getCars({ limit, offset }, { orderBy, order }, filterOptions, controller.signal);
      setCars(data.content);
      setCount(data.totalElements);
      if (data.totalPages <= offset / limit) {
        setOffset(0);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setFailedToLoad(true);
      }
    }
    if (!controller.signal.aborted)
      setLoading(false);
  }

  const deleteSelected = async () => {
    try {
      await deleteCars(selected);
      dispatch(addMessage({
        message: `${selected.length} car(s) successfully deleted`,
        severity: 'success',
      }))
      setSelected([]);
      loadCars();
    } catch (error) {
      console.log('There was an error');
    }
  }

  useEffect(() => {
    setOffset(0);
  }, [filterOptions]);

  useEffect(() => {
    loadCars();

    return () => {
      controller.abort();
    }

  }, [limit, offset, orderBy, order, filterOptions]);

  const emptyRows =
    (offset / limit) > 0 ?
      Math.max(0, (1 + (offset / limit)) * limit - count) :
      0;
  const selectedCount = cars.filter(car => selected.includes(car.id)).length;
  return (
    <Stack>
      <Toolbar
        sx={{
          px: 1
        }}
      >
        {selected.length > 0 ? (
          <>
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
            <Tooltip title="Delete">
              <IconButton onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon color='error' />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Stack width='100%' direction='row' justifyContent='space-between'>
            <Tooltip title='Refresh'>
              <IconButton onClick={loadCars}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <span style={{
                ...(loading && {
                  cursor: 'not-allowed'
                }),
                margin: 0,
                padding: 0,
              }}
              >
                <IconButton
                  disabled={loading}
                  onClick={e => setFilterOpen(!filterOpen)}
                >
                  {filterOpen ?
                    <FilterListOffIcon /> :
                    <FilterListIcon />
                  }
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        )}
      </Toolbar>
      <TableContainer sx={{ maxHeight: '450px' }}>
        <Table
          stickyHeader
          ref={scrollRef}
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {!loading && cars.length > 0 &&
                  <Checkbox
                    color="primary"
                    inputProps={{
                      'aria-label': 'Select all'
                    }}
                    onClick={e => {
                      if (cars.some(car => selected.includes(car.id))) {
                        const toUnselect = cars.map(c => c.id).filter(c_id => selected.includes(c_id));
                        setSelected(prev => prev.filter(id => !toUnselect.includes(id)));
                      } else {
                        setSelected(prev => [...cars.map(car => car.id), ...prev]);
                      }
                    }}
                    indeterminate={0 < selectedCount && selectedCount < cars.length}
                    checked={cars.every(car => selected.includes(car.id))}
                  />
                }
              </TableCell>
              <TableCell width='25%'>
                <TableSortLabel
                  active={orderBy === 'modelYear'}
                  direction={orderBy === 'modelYear' ? order : 'asc'}
                  onClick={handleSort('modelYear')}
                >
                  Model year
                </TableSortLabel>
              </TableCell>
              <TableCell width='25%'>
                <TableSortLabel
                  active={orderBy === 'makeName'}
                  direction={orderBy === 'makeName' ? order : 'asc'}
                  onClick={handleSort('makeName')}
                >
                  Make
                </TableSortLabel>
              </TableCell>
              <TableCell width='25%'>
                <TableSortLabel
                  active={orderBy === 'model'}
                  direction={orderBy === 'model' ? order : 'asc'}
                  onClick={handleSort('model')}
                >
                  Model
                </TableSortLabel>
              </TableCell>
              <TableCell width='25%' align='right'>
                <TableSortLabel
                  active={orderBy === 'quantity'}
                  direction={orderBy === 'quantity' ? order : 'asc'}
                  onClick={handleSort('quantity')}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ?
              <TableRow
                style={{
                  height: 53 * limit,
                }}
              >
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow> :
              <>
                {
                  cars.map(car => {
                    const isItemSelected = isSelected(car.id);

                    return (
                      <TableRow selected={isItemSelected} hover key={car.id} onClick={e => handleTableRowClick(e, car)} style={{ cursor: 'pointer' }}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            inputProps={{
                              'aria-label': 'Select car'
                            }}
                            checked={isItemSelected}
                            onClick={e => {
                              if (selected.indexOf(car.id) === -1) {
                                setSelected(prev => [car.id, ...prev]);
                              } else {
                                setSelected(prev => {
                                  return prev.filter(i => i !== car.id);
                                });
                              }
                              e.stopPropagation()
                            }}
                          />
                        </TableCell>
                        <TableCell>{car.modelYear}</TableCell>
                        <TableCell>{car.make?.name}</TableCell>
                        <TableCell>{car.model}</TableCell>
                        <TableCell align='right'>{car.quantity}</TableCell>
                      </TableRow>
                    );
                  })
                }
                {
                  emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={5} />
                    </TableRow>
                  )
                }
                {
                  (cars.length === 0 || failedToLoad) &&
                  <TableRow>
                    <TableCell colSpan={5} align='center'>
                      {failedToLoad ?
                        <p>
                          Failed to load <br />
                          <Tooltip title="Try again">
                            <IconButton onClick={loadCars}>
                              <ReplayIcon />
                            </IconButton>
                          </Tooltip>
                        </p> :
                        'No results'
                      }
                    </TableCell>
                  </TableRow>
                }
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={count}
        rowsPerPage={limit}
        page={offset / limit}
        onPageChange={handleChangePage}
        SelectProps={{
          disabled: loading
        }}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      <DeleteCarDialog
        open={deleteDialogOpen}
        onClose={e => setDeleteDialogOpen(false)}
        onDelete={deleteSelected}
      />
    </Stack>
  )
}