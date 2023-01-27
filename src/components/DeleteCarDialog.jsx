import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";

const DeleteCarDialog = ({car, open, onClose, onDelete, ...props}) => {


  return (
    <Dialog open={open}>
      <DialogTitle>
        Delete car
      </DialogTitle>
      <DialogContent dividers>
        { car ?
          <Typography>Are you sure you want to delete the car <i>{car.modelYear + ' ' + car.make.name + ' ' + car.model}</i> ?</Typography> :
          <Typography>Are you sure you want to delete the selected cars?</Typography>
        }
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={onClose}
          variant='outlined'
        >
          Cancel
        </Button>
        <Button
          onClick={e => { onDelete(); onClose(); }}
          variant='contained'
          color='error'
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCarDialog;
