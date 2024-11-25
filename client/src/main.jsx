import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx"
import {Provider} from 'react-redux'
import store from './redux/store.js'
import { ThemeProvider } from '@material-tailwind/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <Provider store={store}>
    <App />
    <ToastContainer/>
    </Provider>
    </ThemeProvider>
    
   
  </StrictMode>
)
