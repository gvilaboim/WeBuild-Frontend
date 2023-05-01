import React from 'react'
import ReactDOM from 'react-dom/client'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <AuthProviderWrapper>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </AuthProviderWrapper>
  </Router>
)
