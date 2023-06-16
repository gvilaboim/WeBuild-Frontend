import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'

import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' 


import { AuthProviderWrapper } from './context/auth.context'
import { CanvasProviderWrapper } from './context/canvas.context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <AuthProviderWrapper>
      <CanvasProviderWrapper>
        <DndProvider options={HTML5toTouch}
        >
          <App />
        </DndProvider>
      </CanvasProviderWrapper>
    </AuthProviderWrapper>
  </Router>
)
