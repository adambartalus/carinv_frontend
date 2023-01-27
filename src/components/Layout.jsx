import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import DrawerMenu from './DrawerMenu';
import CustomAppBar from './CustomAppBar';
import { ScrollTop } from './ScrollTop';

import '../style/index.css';

const Layout = props => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { href: '/', text: 'Home', icon: <HomeIcon /> },
    { href: '/cars', text: 'List cars', icon: <DirectionsCarIcon /> },
    { href: '/add-car', text: 'Add car', icon: <AddIcon /> },
  ];

  return (
    <>
      <CustomAppBar
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <Toolbar />
      <Stack direction='row' justifyContent='center' alignItems='center'>
        <DrawerMenu
          menuItems={menuItems}
          open={drawerOpen}
          setOpen={setDrawerOpen}
        />
        <Box width='100%'>
          <div id="back-to-top-anchor" />
          <Outlet />
          <Toolbar />
          <ScrollTop {...props}>
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Box>
      </Stack>
    </>
  );
}


export default Layout;
