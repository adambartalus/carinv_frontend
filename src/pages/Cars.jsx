import { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material/styles';

import CarFilter from '../components/CarFilterv2';
import { CarTable } from '../components/CarTable';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginRight: open ? 0 : -drawerWidth,
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const Cars = props => {

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    makes: [],
    minModelYear: 1913,
    maxModelYear: 2023
  });

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ display: 'flex' }}>
      <Main open={filterOpen}>
        <Paper
          sx={{
            flexGrow: 1
          }}
        >
          <TableContainer>
            <CarTable
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              filterOptions={filterOptions}
            />
          </TableContainer>
        </Paper>
      </Main>
      <Drawer
        variant={md ? 'persistent' : 'temporary'}
        anchor='right'
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        sx={{
          width: '300px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '300px',
            boxSizing: 'border-box',
          },
          ...(md && !filterOpen && {
            zIndex: -1,
          })
        }}
      >
        <Toolbar />
        <Stack
          height='100%'
          p={2}
        >
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h5' >
              Filters
            </Typography>
            <IconButton
              onClick={e => setFilterOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <CarFilter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </Stack>
      </Drawer>
      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={filterOpen}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer> */}
    </Box>
  );
};

export default Cars;