import React from 'react'
import { Box, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchParams } from 'react-router-dom'

const Search: React.FC<{ setSearchValue: (value: string) => void }> = ({
  setSearchValue
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (value: string) => {
    if (value) {
      setSearchParams({ search: value })
    } else {
      searchParams.delete('search')
      setSearchParams(searchParams)
    }
    setSearchValue(value)
  }

  return (
    <Box className='px-5'>
      <Paper
        className='flex items-center !bg-transparent shadow-none'
        component='form'
      >
        <IconButton type='button' aria-label='search'>
          <SearchIcon className='text-gray-600 !text-3xl' />
        </IconButton>
        <InputBase
          className='ml-1 flex-1 !text-white'
          placeholder='Search'
          inputProps={{
            'aria-label': 'search'
          }}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Paper>
    </Box>
  )
}

export default Search
