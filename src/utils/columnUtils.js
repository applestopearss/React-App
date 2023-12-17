import React from 'react';
import { Button } from '@mui/material';
import { getStatusStyle } from './statusUtils';

export const createColumns = (loadingStatusId, toggleStatus) => ([
  { field: 'name', headerName: 'Name', flex: 1, sortable: true, filterable: true },
  { field: 'pickup', headerName: 'Pickup', flex: 1, sortable: true, filterable: true },
  { field: 'delivery', headerName: 'Delivery', flex: 1, sortable: true, filterable: true },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    sortable: true,
    filterable: true,
    renderCell: (params) => (
      <Button
        disabled={loadingStatusId === params.row.id}
        onClick={(event) => {
          event.stopPropagation();
          toggleStatus(params.row.id);
        }}
        style={getStatusStyle(params.row.status, params.row.id, loadingStatusId)}
      >
        {params.row.status}
      </Button>
    ),
  },
]);