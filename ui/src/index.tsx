import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material'


const theme = createTheme({
  palette: {
    primary: {
      main: '#202020'
    },
    secondary: {
      main: '#ADFF00'
    },
    grey: {
      50: '#FAFAFA',
      100: '#E5E7EB',
      400: '#8C8C8C',
      600: '#6B7280',
      700: '#363636',
      800: '#39393B',
      900: '#0D0D0D'
    },
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
