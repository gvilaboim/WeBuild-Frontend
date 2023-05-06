import './App.css'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import Dashboard from './pages/Dashboard/Dashboard'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'

import NavBar from './components/NavBar/NavBar' 
import IsPrivate from './components/IsPrivate/IsPrivate'
import IsAnon from './components/IsAnon/IsAnon'
import Create from './pages/Create/Create'
import CreateForm from './pages/Create/CreateForm'

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />

        <Route
          path='/dashboard'
          element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          }
        />
        <Route
          path='/websites'
          element={
            <IsPrivate>
              <CreateForm />
            </IsPrivate>
          }
        />
        <Route
          path='/websites/edit/:id'
          element={
            <IsPrivate>
              <Create />
            </IsPrivate>
          }
        />

        <Route
          path='/signup'
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path='/login'
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  )
}

export default App
