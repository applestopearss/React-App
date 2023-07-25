import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CustomTable = () => {
  const [rows, setRows] = useState([
    { id: 1, name: 'Item 1', pickup: 'Seattle at 7:30, 7/24/2023', delivery: 'Redmont at 7:30, 7/25/2023', status: 'Active' },
    { id: 2, name: 'Item 2', pickup: 'Tacoma at 10:00, 7/27/2023', delivery: 'Olympia at 10:30, 7/30/2023', status: 'Inactive' },
    { id: 3, name: 'Item 3', pickup: 'Seattle at 2:00, 7/15/2023', delivery: 'Spokane at 7:00, 7/20/2023', status: 'Inactive' },
    { id: 4, name: 'Item 4', pickup: 'Auburn at 7:30, 7/24/2023', delivery: 'Everett at 3:00, 7/30/2023', status: 'Active' },
    // ... Add more initial rows if needed
  ]);

  // Rows to add are Load number, pickup date, pickup time, pickup city, delivery city, delivery date, comments

  

  const toggleStatus = (id) => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return {
          ...row,
          status: row.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Pickup</TableCell>
            <TableCell>Delivery</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              
              <TableCell component="th" scope="row">
                {row.pickup}
              </TableCell>
              
              <TableCell component="th" scope="row">
                {row.delivery}
              </TableCell>

              <TableCell align="right" onClick={() => toggleStatus(row.id)} style={{ cursor: 'pointer' }}>
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;