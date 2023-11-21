import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { addLoadToDatabase } from '../functions/database.js';

const CustomTable = () => {
  const [rows] = useState([
    { id: 1, name: 'Item 1', pickup: 'Seattle at 7:30, 7/24/2023', delivery: 'Redmont at 7:30, 7/25/2023', status: 'Active' },
    { id: 2, name: 'Item 2', pickup: 'Tacoma at 10:00, 7/27/2023', delivery: 'Olympia at 10:30, 7/30/2023', status: 'Inactive' },
    { id: 3, name: 'Item 3', pickup: 'Seattle at 2:00, 7/15/2023', delivery: 'Spokane at 7:00, 7/20/2023', status: 'Inactive' },
    { id: 4, name: 'Item 4', pickup: 'Auburn at 7:30, 7/24/2023', delivery: 'Everett at 3:00, 7/30/2023', status: 'Active' },
    // ... Add more initial rows if needed
  ]);

  const [open, setOpen] = useState(false);
  const [newLoad, setNewLoad] = useState({ name: '', pickup: '', delivery: '', comments: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await addLoadToDatabase(newLoad);
    handleClose();
    // Optionally, update the table to show the new load
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        New Load
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Load</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newLoad.name}
            onChange={handleInputChange}
          />
          {/* Add more input fields for pickup, delivery, comments */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
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

                <TableCell align="right" onClick={() => addLoadToDatabase()} style={{ cursor: 'pointer' }}>
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;