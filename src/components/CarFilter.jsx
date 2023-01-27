import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

const CarFilter = ({ filterOptions, setFilterOptions, ...props }) => {

  const [filters, setFilters] = useState({});

  const handleFilterInputChange = event => {
    setFilters(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const clearFilters = () => {
    setFilters({});
  }

  return (
    <Grid2 container p={2} spacing={2} disableEqualOverflow>
      <Grid2 xs={12} sm={6}>
        <TextField
          fullWidth
          label='Make'
          name='make'
          value={filters.make || ''}
          onChange={handleFilterInputChange}
        />
      </Grid2>
      <Grid2 xs={12} sm={6}>
        <TextField
          fullWidth
          label='Model'
          name='model'
          value={filters.model || ''}
          onChange={handleFilterInputChange}
        />
      </Grid2>

      <Grid2 container xs={12} sm={6} alignItems='center' spacing={1}>
        <Grid2 xs>
          <TextField
            fullWidth
            type='number'
            label='Min model year'
            name='minModelYear'
            value={filters.minModelYear || ''}
            onChange={handleFilterInputChange}
          />
        </Grid2>
        <Grid2>
          <p>-</p>
        </Grid2>
        <Grid2 xs>
          <TextField
            fullWidth
            type='number'
            label='Max model year'
            name='maxModelYear'
            value={filters.maxModelYear || ''}
            onChange={handleFilterInputChange}
          />
        </Grid2>
      </Grid2>
      <Grid2 container xs={12} sm={6} alignItems='center' spacing={1}>
        <Grid2 xs>
          <TextField
            fullWidth
            type='number'
            label='Min quantity'
            name='minQuantity'
            value={filters.minQuantity || ''}
            onChange={handleFilterInputChange}
          />
        </Grid2>
        <Grid2>
          <p>-</p>
        </Grid2>
        <Grid2 xs>
          <TextField
            fullWidth
            type='number'
            label='Max quantity'
            name='maxQuantity'
            value={filters.maxQuantity || ''}
            onChange={handleFilterInputChange}
          />
        </Grid2>

      </Grid2>
      <Grid2 xs={12} container justifyContent='end' alignItems='center'>
        <Grid2 xs={12} md={4} lg={3}>
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={() => { setFilterOptions(filters) }}
          >
            Filter
          </Button>
        </Grid2>
        <Grid2 xs={12} md={4} lg={3} >
          <Button
            variant='contained'
            color='error'
            type='submit'
            size='large'
            fullWidth
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
export default CarFilter;