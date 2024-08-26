import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

interface DeleteDialogProps {
  open: boolean
  disableDelete: boolean
  handleDelete: () => void
  handleClose: () => void
  deleteError?: string
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  disableDelete,
  handleDelete,
  handleClose,
  deleteError
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='delete-dialog'
      aria-describedby='delete-dialog-alert'
    >
      <DialogTitle id='delete-dialog'>
        <WarningAmberIcon color='warning' /> Are you sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='delete-dialog-alert'>
          Are you sure you want to delete this video? Once deleted, it will be
          permanently removed, and you will no longer have access to it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {deleteError && <Alert severity='error'>{deleteError}</Alert>}
        <Button variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={handleDelete}
          disabled={disableDelete}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
