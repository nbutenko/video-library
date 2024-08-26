import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import VideoList from './pages/video-list/VideoList'
import VideoDetails from './pages/video-details/VideoDetails'

const App: React.FC = () => {
  return (
    <main className='bg-primary-dark w-full min-h-screen'>
      <Router>
        <Routes>
          <Route path='/' element={<VideoList />} />
          <Route path='/videos/:id' element={<VideoDetails />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
