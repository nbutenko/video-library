import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { sanitize } from 'dompurify'
import { httpClient } from '../../api/axios-client'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Typography,
  useTheme
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import SettingsIcon from '@mui/icons-material/Settings'
import FormDialog from '../../components/FormVideo/FormDialog'
import { Video } from '../../interfaces/Video'
import { parseVideoUrl } from './utils/parse-url'

const VideoDetails: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingError, setLoadingError] = useState<string>('')
  const [video, setVideo] = useState<Video | null>(null)
  const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string>('')
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false)

  useEffect(() => {
    if (loadingError) setLoadingError('')

    const fetchVideo = async () => {
      try {
        const { data } = await httpClient.get(`/videos/${id}`)
        setVideo(data)
      } catch (error) {
        setLoadingError('Error fetching video - try again later.')
        console.error('Error fetching video:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [id])

  const handleUpdate = async (video: Video) => {
    setDisableSaveButton(true)

    try {
      await httpClient.put(`/videos/${id}`, video)
      setVideo({ ...video, id: Number(id) })
      setFormDialogOpen(false)
      setSaveError('')
    } catch (error) {
      setSaveError('Error updating video - try again later.')
      console.error('Error updating video:', error)
    } finally {
      setDisableSaveButton(false)
    }
  }

  return (
    <Box className='p-10'>
      <Button
        variant='outlined'
        sx={{
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main
        }}
        onClick={() => navigate(`/`)}
        startIcon={<ChevronLeftIcon />}
      >
        Back
      </Button>

      {loading ? (
        <Box className='col-span-5 text-center mt-10'>
          <CircularProgress color='secondary' />
        </Box>
      ) : loadingError ? (
        <Alert className='!mt-10' severity='error'>
          {loadingError}
        </Alert>
      ) : (
        <>
          {video && (
            <>
              <IconButton
                aria-label='settings'
                onClick={() => setFormDialogOpen(true)}
                className='!fixed top-10 right-10 z-50'
              >
                <SettingsIcon fontSize='large' color='secondary' />
              </IconButton>
              <Container className='py-12'>
                {
                  <Box className='p-4'>
                    <Typography variant='h4' color={theme.palette.grey[100]}>
                      {video.name}
                    </Typography>
                    <Typography variant='h6' color={theme.palette.grey[400]}>
                      {video.artist}
                    </Typography>
                    <div className='mt-4'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitize(parseVideoUrl(video.url), {
                            ADD_TAGS: ['iframe'],
                            ADD_ATTR: ['target']
                          })
                        }}
                      />
                    </div>
                  </Box>
                }
              </Container>
            </>
          )}
        </>
      )}

      <FormDialog
        open={formDialogOpen}
        defaultValue={video}
        handleClose={() => {
          setFormDialogOpen(false)
          setDisableSaveButton(false)
          setSaveError('')
        }}
        handleSave={handleUpdate}
        disableSave={disableSaveButton}
        saveError={saveError}
      />
    </Box>
  )
}

export default VideoDetails
