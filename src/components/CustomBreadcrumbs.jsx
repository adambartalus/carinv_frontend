import { Link as RouterLink, useLocation } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const breadcrumbNameMap = {
  '/cars': 'Cars',
  '/signup': 'Signup',
  '/login': 'Login',
  '/add-car': 'Add car'
};

const CustomBreadcrumbs = props => {

  const pathNames = useLocation().pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      color='white'
      {...props}
    >
      <Link underline="hover" color='inherit' to='/' component={RouterLink}>Home</Link>
      {pathNames.map((value, index) => {
        const last = index === pathNames.length - 1;
        const to = `/${pathNames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="gray" key={to}>
            {breadcrumbNameMap[to] ?? value}
          </Typography>
        ) : (
          <Link component={RouterLink} underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default CustomBreadcrumbs;
