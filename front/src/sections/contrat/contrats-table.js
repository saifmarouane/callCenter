import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';


import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';



export const ContratsTable = (props) => {

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch data from the Django API endpoint
//     fetch('/api/orders/')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); // Log the data to the console
//             setOrders(data);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }, []);



  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const { push } = useRouter();

  const handleClick = () => {
    push('/');
  };

  // const handleClick = () => {
  //   push('/C:/Users/HP/Desktop/SmartPack/nextjs-app-front-master/src/pages/OrderDetailsPage.js');
  // };

  //------------ WORK WITH API -------------//
  const handleViewProfile = (customerId) => {
  };
  const handleDeleteCustomer = (customerId) => {
    // Implement logic to handle delete customer
  };
  //------------ WORK WITH API -------------//

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  {/* Name */}
                  Order Id
                </TableCell>
                <TableCell>
                  {/* Email */}
                  Customer Id
                </TableCell>
                <TableCell>
                  {/* Location */}
                  Customer Name
                </TableCell>
                <TableCell>
                  {/* Phone */}
                  Date
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {customer.id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.cust_id}
                    </TableCell>
                    <TableCell>
                      {customer.cust_name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={handleClick}>
                      {/* <IconButton color="primary" onClick={() => handleViewProfile(customer.id)}> */}
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteCustomer(customer.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ContratsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
