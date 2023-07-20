import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CustomTable = () => {
  const [rows, setRows] = useState([
    { id: 1, name: 'Item 1', status: 'Active' },
    // ... Add more initial rows if needed
  ]);

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
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
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