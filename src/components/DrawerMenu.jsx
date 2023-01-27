import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { SwipeableDrawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 160;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(SwipeableDrawer, { shouldForwardProp: (prop) => prop })(
  ({ theme, open, variant }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && variant == 'permanent' && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && variant == 'permanent' && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ menuItems, open, setOpen, ...props }) {

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Drawer
      variant={md ? 'permanent' : 'temporary'}
      anchor='left'
      open={open}
      {...props}
      onClose={() => setOpen(false)}
      onClick={event => {
        if(md) return;
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpen(false)
      }}
      onOpen={() => setOpen(true)}
    >
      <DrawerHeader sx={{
        borderBottom: '1px solid grey',
        boxSizing: 'border-box',
      }}>
        {md &&
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              ...(!open && { display: 'none' }),
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        }
      </DrawerHeader>
      <List
        sx={{
          mx: 'auto',
          height: '100%',
          width: '100%',
          p: 0,
        }}
      >
        {menuItems.map(({ href, text, icon }, index) => (
          <ListItem key={href} disablePadding divider>
            <ListItemButton
              to={href}
              component={Link}
              sx={{
                py: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open || !md ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open || !md ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
