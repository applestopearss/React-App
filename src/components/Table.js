import React, { useState, useEffect } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert } from '@mui/material';
import { addLoadToDatabase, getLoads, updateLoadStatus } from '../functions/database.js';

const DELIVERED = 'Delivered'
const PICKED_UP = 'Picked Up'
const IN_TRANSIT = 'In Transit'
const BOOKED = 'Booked'

const statusOptions = [
  { status: BOOKED, color: 'red' },
  { status: PICKED_UP, color: 'green' },
  { status: IN_TRANSIT, color: 'yellow' },
  { status: DELIVERED, color: 'black' },
];

const CustomTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchLoads = async () => { // Get initial data
      const loads = await getLoads();
      setRows(loads);
    };
    fetchLoads();
  }, []);

  const [open, setOpen] = useState(false);
  const [newLoad, setNewLoad] = useState({ name: '', pickup: '', delivery: '', comments: '' });
  const [error, setError] = useState('');
  const [loadingStatusId, setLoadingStatusId] = useState(null); // Track which load is being updated

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewLoad({ name: '', pickup: '', delivery: '', comments: '' }); // Reset form
  };

  const handleInputChange = (e) => {
    setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (newLoad.name && newLoad.pickup && newLoad.delivery) { // Basic validation
      newLoad.status = BOOKED;
      await addLoadToDatabase(newLoad);
      handleClose();
      setRows([...rows, newLoad]); // Optimistically update UI
    } else {
      // Show validation error
    }
  };

  const toggleStatus = async (id) => {
    setLoadingStatusId(id); // Start loading for this id
    const loadToUpdate = rows.find(row => row.id === id);
    if (!loadToUpdate) return;

    const currentStatusIndex = statusOptions.findIndex(s => s.status === loadToUpdate.status);
    const nextStatusIndex = (currentStatusIndex + 1) % statusOptions.length;
    const newStatus = statusOptions[nextStatusIndex].status;

    try {
      await updateLoadStatus(id, newStatus); // Update the status in the database

      const updatedRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, status: newStatus };
        }
        return row;
      });

      setRows(updatedRows);
    } catch (error) {
      console.error('Error updating load status:', error);
      setError('Failed to update status. Please try again.'); // Set error message
    } finally {
      setLoadingStatusId(null); // End loading regardless of success or error
    }
  };

  const getStatusStyle = (status, id) => {
    const statusColor = statusOptions.find(s => s.status === status)?.color;
    return {
      backgroundColor: loadingStatusId === id ? 'grey' : statusColor, // Grey out if loading
      color: statusColor === 'yellow' ? 'black' : 'white',
      cursor: 'pointer',
      width: '120px', // Set a fixed width
      height: '40px', // Set a fixed height
      padding: '5px 10px', // Optional, adjust for better text alignment
      textAlign: 'center', // Center the text
      whiteSpace: 'nowrap', // Prevents text wrapping
      overflow: 'hidden', // Keeps the text within the button
      textOverflow: 'ellipsis', // Adds an ellipsis if the text is too long
    };
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
          <TextField
            margin="dense"
            name="pickup"
            label="Pickup"
            type="text"
            fullWidth
            variant="standard"
            value={newLoad.pickup}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="delivery"
            label="Delivery"
            type="text"
            fullWidth
            variant="standard"
            value={newLoad.delivery}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="comments"
            label="Comments"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={newLoad.comments}
            onChange={handleInputChange}
          />
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Pickup</TableCell>
              <TableCell align="left">Delivery</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left" component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="left" component="th" scope="row">
                  {row.pickup}
                </TableCell>

                <TableCell align="left" component="th" scope="row">
                  {row.delivery}
                </TableCell>

                <TableCell align="left" component="th" scope="row">
                  <Button
                    onClick={() => toggleStatus(row.id)}
                    disabled={loadingStatusId === row.id} // Disable the button if loading
                    style={getStatusStyle(row.status, row.id)}
                  >
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default CustomTable;