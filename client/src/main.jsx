// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { AuthContextProvider  } from '../context/auth.context.jsx';
import { ChatProvider } from '../context/chatContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContextProvider >
    <ChatProvider>
    <App />
    </ChatProvider>
    
  </AuthContextProvider>
  </BrowserRouter>,
)
