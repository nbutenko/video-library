import React from 'react'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import Input from './Input'
import { formVideoSchema } from './form-video-schema'
import { Video } from '../../interfaces/Video'

interface FormDialogProps {
  open: boolean
  defaultValue?: Video | null
  handleClose: () => void
  handleSave: SubmitHandler<Video>
  disableSave: boolean
  saveError?: string
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  defaultValue,
  handleClose,
  handleSave,
  disableSave,
  saveError
}) => {
  const onSubmit: SubmitHandler<Video> = (data) => {
    if (!isDirty) return handleClose()
    handleSave(data)
  }

  const formHook = useForm<Video>({
    mode: 'onChange',
    resolver: joiResolver(formVideoSchema) as Resolver<Video>,
    shouldUnregister: true
  })

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit
  } = formHook

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='create-video'
      aria-describedby='create-video-form'
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle id='create-video'>Create video</DialogTitle>
        <DialogContent className='!p-4'>
          <Input
            register={register}
            id='name'
            label='Name'
            defaultValue={defaultValue?.name}
            errorMessage={errors['name']?.message}
          />
          <Input
            register={register}
            id='artist'
            label='Artist'
            defaultValue={defaultValue?.artist}
            errorMessage={errors['artist']?.message}
          />
          <Input
            register={register}
            id='url'
            label='Video URL'
            defaultValue={defaultValue?.url}
            errorMessage={errors['url']?.message}
          />
          <Input
            register={register}
            id='poster'
            label='Poster URL'
            defaultValue={defaultValue?.poster}
            errorMessage={errors['poster']?.message}
          />
        </DialogContent>
        <DialogActions>
          {saveError && <Alert severity='error'>{saveError}</Alert>}
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' type='submit' disabled={disableSave}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default FormDialog
