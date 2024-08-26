import React from 'react'
import { Box, ButtonBase, Divider, Typography } from '@mui/material'
import MenuIcon from '../../../components/Icons/MenuIcon'
import HomeIcon from '../../../components/Icons/HomeIcon'
import Search from './Search'
import Logo from './Logo'

const Navigation: React.FC<{ setSearchValue: (value: string) => void }> = ({
  setSearchValue
}) => (
  <Box className='hidden md:flex flex-col w-full border-r-2 border-gray-100 p-3 h-screen justify-between sticky top-0'>
    <Box>
      <Logo />
      <Search setSearchValue={setSearchValue} />

      <ButtonBase sx={{ width: '100%', display: 'block' }}>
        <Box className='bg-gray-800 rounded-xl py-3 px-4 text-primary-light flex items-center mb-5'>
          <MenuIcon />
          <Typography fontSize={18} ml={2}>
            Your Library
          </Typography>
        </Box>
      </ButtonBase>

      <Divider variant='middle' className='bg-gray-600' />
    </Box>

    <Box className='w-full text-gray-400 px-5 pb-4 flex items-center'>
      <HomeIcon />
      <Box className='ml-3'>Welcome to Medea!</Box>
    </Box>
  </Box>
)

export default Navigation
