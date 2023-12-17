import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AddLoadDialog = ({ open, onClose, newLoad, onInputChange, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          name="pickup"
          label="Pickup"
          type="text"
          fullWidth
          variant="standard"
          value={newLoad.pickup}
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          name="delivery"
          label="Delivery"
          type="text"
          fullWidth
          variant="standard"
          value={newLoad.delivery}
          onChange={onInputChange}
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
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLoadDialog;
