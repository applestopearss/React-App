import React, { useState, useEffect } from 'react';
import { Button, Alert, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { addLoadToDatabase, getLoads, updateLoadStatus } from '../functions/database';
import { statusOptions, BOOKED } from '../utils/statusUtils';
import { createColumns } from '../utils/columnUtils';
import AddLoadDialog from './AddLoadDialog'; // Sub-component for adding a new load

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

  const columns = createColumns(loadingStatusId, toggleStatus);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={handleClickOpen}>
            New Load
          </Button>
        </Grid>
      </Grid>
      <AddLoadDialog
        open={open}
        onClose={handleClose}
        newLoad={newLoad}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default CustomTable;