import { useState } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";

import SaveIcon from '@mui/icons-material/Save';

const UpdateCarDialog = ({ open, onClose, onSubmit, ...props }) => {
  const [quantity, setQuantity] = useState(props.quantity);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionProps={{
        onExited: e => setQuantity(props.quantity)
      }}
    >
      <DialogTitle>Update quantity</DialogTitle>
      <DialogContent dividers>
        <TextField
          type='number'
          label='Quantity'
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          min='1'
          max='1000'
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={e => onSubmit(quantity)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCarDialog;
