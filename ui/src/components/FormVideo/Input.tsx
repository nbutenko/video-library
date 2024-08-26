import React from 'react'
import { Box, TextField } from '@mui/material'

interface Props {
  register: any
  id: string
  label: string
  defaultValue?: string
  isRequired?: boolean
  errorMessage?: string
}

export const Input: React.FC<Props> = ({
  register,
  id,
  label,
  defaultValue,
  isRequired = true,
  errorMessage
}) => (
    <TextField
      {...register(id)}
      defaultValue={defaultValue}
      label={label}
      error={!!errorMessage}
      required={isRequired}
      fullWidth
      className='!mb-4'
      variant='outlined'
      helperText={
        <Box
          component='span'
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{errorMessage}</span>
        </Box>
      }
    />
)

export default Input
