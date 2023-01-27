import { Link } from 'react-router-dom';

import Grid2 from '@mui/material/Unstable_Grid2';

import { Tile } from '../components/Tile';
import { Typography } from '@mui/material';

const Home = props => {

  return (
    <Grid2
      container 
      spacing={10}
      margin={0}
    >
      <Grid2 xs={12} md={6}>
        <Tile to='/cars' component={Link}>
          <Typography m='auto' variant='h3' >List cars</Typography>
        </Tile>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Tile to='/add-car' component={Link}>
          <Typography m='auto' variant='h3'>Add car</Typography>
        </Tile>
      </Grid2>
    </Grid2>
  );
}

export default Home;
