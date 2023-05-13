import './App.css'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import Dashboard from './pages/Dashboard/Dashboard'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'

import NavBar from './components/Navbar/Navbar'
import IsPrivate from './components/IsPrivate/IsPrivate'
import IsAnon from './components/IsAnon/IsAnon'
import Create from './pages/Create/Create'
import CreateForm from './pages/Create/CreateForm'
import AllPlans from './pages/Upgrade/AllPlans'
import SinglePlan from './pages/Upgrade/SinglePlan'
import Success from './pages/Upgrade/Success'
import PublicView from './pages/PublicView/PublicView'
import UserSettings from './pages/Settings/UserSettings'

function App() {
  return (
    <div className='App'>
      <NavBar/> 
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
          path='/settings'
          element={
            <IsPrivate>
              <UserSettings />
            </IsPrivate>
          }
        />
        <Route
          path='/upgrade'
          element={
            <IsPrivate>
              <AllPlans />
            </IsPrivate>
          }
        />
        <Route
          path='/upgrade/:id'
          element={
            <IsPrivate>
              <SinglePlan />
            </IsPrivate>
          }
        />
          <Route
          path='/success'
          element={
            <IsPrivate>
              <Success />
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

            <Route
          path='/webuild/:username/:sitename'
          element={
            <IsPrivate>
              <PublicView />
              </IsPrivate>
          }
        />

      </Routes>
    </div>
  )
}

export default App
