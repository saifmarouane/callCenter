import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';

import { SeverityPill } from '../../components/severity-pill';

import React, { useState } from 'react';



import Checkbox from '@mui/material/Checkbox';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const {orders :initialOrders = [], sx } = props;
  const [orders, setOrders] = React.useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);


//--------WORK WITH API-----------//
  const handleStatusToggle = (orderId) => {
    setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order.id === orderId ? { ...order, isAvailable: !order.isAvailable } : order
    )
  );
  };
  //--------WORK WITH API-----------//

  return (
    <Card sx={sx}>
      <CardHeader title="" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
