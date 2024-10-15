import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { applyPagination } from '../utils/apply-pagination';

import { useAuthContext} from '../contexts/auth-context';
import { Link,BrowserRouter }  from 'react-router-dom';

import Register from '../pages/auth/register'
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  IconButton
} from '@mui/material';




const now = new Date();







const usecontrats = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (contrats) => {
  return useMemo(
    () => {
      return contrats.map((customer) => customer.id);
    },
    [contrats]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //const contrats = usecontrats(page, rowsPerPage);
  //const contratsIds = useCustomerIds(contrats);
  //const contratsSelection = useSelection(contratsIds);


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  //useauth
  const { state, signIn, signOut } = useAuthContext();


  return (

    <>

      

      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={6}>
            
            


            <Register
            />




          </Stack>
        </Container>
      </Box>
    </>

  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
