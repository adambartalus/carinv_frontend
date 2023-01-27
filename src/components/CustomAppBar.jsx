import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import GarageIcon from '@mui/icons-material/Garage';

import { logoutThunk } from '../authSlice';
import { useCurrentUser } from '../hooks/useCurrentUser';
import CustomBreadcrumbs from './CustomBreadcrumbs';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 160;

function ResponsiveAppBar({ drawerOpen, setDrawerOpen, navLinks = [], ...props }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useCurrentUser();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutThunk());
    navigate('/login');
  }

  const settings = [
    { label: 'Log out', onClick: handleLogOut }
  ];

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: '#123456',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(drawerOpen && {
          marginLeft: { md: '160px' },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
        ...(md && {
          zIndex: 1201,
        })
      }}
    >
      <Toolbar >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={e => setDrawerOpen(true)}
          edge="start"
          sx={{
            ':hover': {
              bgcolor: '#555',
            },
            marginRight: 5,
            ...(drawerOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <GarageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          color='inherit'
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
          }}
        >
          Car Inventory
        </Typography>

        <GarageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Car Inventory
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <CustomBreadcrumbs />
        </Box>
        {user ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.username} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={e => { setting.onClick(); handleCloseUserMenu() }}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> :
          <>
            <Button
              component={RouterLink}
              to='signup'
              color='secondary'
              sx={{
                color: 'inherit',
                ':hover': {
                  color: 'white',
                  backgroundColor: 'rgba(30,30,30,0.2)'
                }
              }}
            >
              Sign up
            </Button>
            <Button
              component={RouterLink}
              to='login'
              sx={{
                color: 'inherit',
                ':hover': {
                  color: 'white',
                  backgroundColor: 'rgba(30,30,30,0.2)'
                }
              }}
            >
              Log in
            </Button>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
