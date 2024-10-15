import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from '../../hooks/use-selection';
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import { Addpost } from '../../sections/contrat/ajouter_contrat';
import { ContratsSearch } from '../../sections/contrat/contrats-search';
import { applyPagination } from '../../utils/apply-pagination';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
 
  IconButton
} from '@mui/material';




const now = new Date();







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

  return (
    <>
      <Head>
        <title>
          ajouter un client
        </title>
      </Head>

      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4" >
                  contrat
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                  
                </Stack>
              </Stack>
              
            </Stack>
            <Addpost
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
