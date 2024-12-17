import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChatContextProvider } from './context/chatContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatContextProvider>
    <App />
    </ChatContextProvider>
  </StrictMode>,
)
