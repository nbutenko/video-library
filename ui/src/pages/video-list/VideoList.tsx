import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { httpClient } from '../../api/axios-client'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  useTheme
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SettingsIcon from '@mui/icons-material/Settings'
import Navigation from './components/Navigation'
import FormDialog from '../../components/FormVideo/FormDialog'
import { Video } from '../../interfaces/Video'
import DeleteDialog from './components/DeleteDialog'

const VideoList: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingError, setLoadingError] = useState<string>('')
  const [videos, setVideos] = useState<Video[]>([])
  const [createFormDialogOpen, setCreateFormDialogOpen] =
    useState<boolean>(false)
  const [updateVideo, setUpdateVideo] = useState<number | null>(null)
  const [saveError, setSaveError] = useState<string>('')
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false)
  const [deleteVideo, setDeleteVideo] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState<string>('')
  const [disableDeleteButton, setDisableDeleteButton] = useState<boolean>(false)

  useEffect(() => {
    const fetchVideos = async () => {
      if (loadingError) setLoadingError('')

      try {
        const { data } = await httpClient.get(
          `videos${searchValue ? `/?search=${searchValue.trim()}` : ''}`
        )
        setVideos(data)
      } catch (error) {
        setLoadingError('Error fetching videos - try again later.')
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [searchValue])

  const handleDelete = async (id: number) => {
    setDisableDeleteButton(true)

    try {
      await httpClient.delete(`/videos/${id}`)
      setVideos(videos.filter((video) => video.id !== id))
      setDeleteVideo(null)
    } catch (error) {
      setDeleteError('Error deleting video - try again later.')
      console.error('Error deleting video:', error)
    } finally {
      setDisableDeleteButton(false)
    }
  }

  const handleSave = async (video: Video) => {
    setDisableSaveButton(true)

    try {
      const { data } = await httpClient.post(`/videos`, video)
      setVideos([...videos, { ...video, id: data.id }])
      setCreateFormDialogOpen(false)
      setSaveError('')
    } catch (error) {
      setSaveError('Error saving video - try again later.')
      console.error('Error creating video:', error)
    } finally {
      setDisableSaveButton(false)
    }
  }

  const handleUpdate = async (video: Video) => {
    setDisableSaveButton(true)
    try {
      await httpClient.put(`/videos/${updateVideo}`, video)
      setVideos([
        ...videos.filter((el) => el.id !== updateVideo),
        { ...video, id: updateVideo as number }
      ])
      setUpdateVideo(null)
      setSaveError('')
    } catch (error) {
      setSaveError('Error updating video - try again later.')
      console.error('Error updating video:', error)
    } finally {
      setDisableSaveButton(false)
    }
  }

  const handleDialogClose = () => {
    setCreateFormDialogOpen(false)
    setUpdateVideo(null)
    setDisableSaveButton(false)
    setSaveError('')
  }

  return (
    <>
      <Box className='grid grid-cols-5'>
      <Navigation setSearchValue={setSearchValue} />

        <Box className='col-span-5 md:col-span-4'>
          <Box className='w-full px-11 py-6 border-b-2 border-gray-700 top-0 sticky bg-primary-dark z-50'>
            <Box className='flex space-x-5'>
              <IconButton className='!bg-gray-50 text-black rounded-full p-2'>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton className='!bg-gray-400 text-black rounded-full p-2'>
                <ChevronRightIcon />
              </IconButton>
            </Box>

            <Box className='font-semibold text-4xl text-white mt-8'>
              Recently Added
            </Box>
          </Box>

          <Box className='p-11 grid gap-2 md:gap-4 justify-center grid-col-2 md:grid-cols-4 lg:grid-cols-5'>
            {loading ? (
              <Box className='col-span-5 text-center mt-10'>
                <CircularProgress color='secondary' />
              </Box>
            ) : loadingError ? (
              <Alert severity='error' className='col-span-5'>
                {loadingError}
              </Alert>
            ) : (
              <>
                {videos.map((item, i) => (
                  <Box key={i} className='mb-6'>
                    <Box
                      className='relative group cursor-pointer'
                      onClick={() => navigate(`/videos/${item.id}`)}
                    >
                      <img
                        src={`${item.poster}`}
                        alt={item.name}
                        className='w-full h-[10rem] lg:h-[15rem] object-cover'
                        loading='lazy'
                      />
                      <Box className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></Box>
                      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <PlayArrowIcon
                          sx={{
                            color: theme.palette.grey[50],
                            fontSize: '3rem'
                          }}
                        />
                      </div>
                    </Box>
                    <Box className='flex justify-between'>
                      <Box className='text-left mt-1'>
                        <div className='text-xs font-bold text-gray-50'>
                          {item.name}
                        </div>
                        <div className='text-xs font-bold text-gray-600'>
                          {item.artist}
                        </div>
                      </Box>
                      <Box className='flex'>
                        <IconButton
                          aria-label='settings'
                          onClick={() => setUpdateVideo(item.id)}
                          className='h-min'
                        >
                          <SettingsIcon fontSize='small' color='secondary' />
                        </IconButton>

                        <IconButton
                          aria-label='delete'
                          className='!text-white !bg-gray-800 rounded-full h-min'
                          onClick={() => setDeleteVideo(item.id)}
                        >
                          <DeleteIcon fontSize='small' />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}

                <Box className='mb-6 w-full h-[10rem] lg:h-[15rem] flex justify-center items-center border-gray-600 border'>
                  <Button
                    variant='text'
                    sx={{ color: theme.palette.secondary.main }}
                    onClick={() => setCreateFormDialogOpen(true)}
                  >
                    Create
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>

      <DeleteDialog
        open={!!deleteVideo}
        disableDelete={disableDeleteButton}
        handleDelete={() => handleDelete(deleteVideo as number)}
        handleClose={() => {
          setDisableDeleteButton(false)
          setDeleteVideo(null)
          setDeleteError('')
        }}
        deleteError={deleteError}
      />

      <FormDialog
        open={createFormDialogOpen}
        handleClose={handleDialogClose}
        handleSave={handleSave}
        disableSave={disableSaveButton}
        saveError={saveError}
      />

      <FormDialog
        open={!!updateVideo}
        defaultValue={videos.find((el) => el.id === updateVideo)}
        handleClose={handleDialogClose}
        handleSave={handleUpdate}
        disableSave={disableSaveButton}
        saveError={saveError}
      />
    </>
  )
}

export default VideoList
