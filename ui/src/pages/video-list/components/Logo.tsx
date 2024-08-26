import React from 'react'
import { Box } from '@mui/material'
import LogoIcon from '../../../components/Icons/LogoIcon'

const Logo: React.FC = () => (
  <Box className='flex items-center p-5'>
    <Box
      className='w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-primary-light text-gray-900 font-bold text-4xl rounded-full'
    >
      <LogoIcon />
    </Box>

    <Box className='text-lg md:text-xl lg:text-4xl ml-4 flex items-center font-bold text-primary-light'>
      Medea<sup className='text-sm'>®</sup>
    </Box>
  </Box>
)

export default Logo
