import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import Dashboard from './pages/Dashboard/Dashboard'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

import IsPrivate from './components/IsPrivate/IsPrivate'
import IsAnon from './components/IsAnon/IsAnon'
import Create from './pages/Create/Create'
import CreateForm from './pages/Create/CreateForm'
import AllPlans from './pages/Upgrade/AllPlans'
import SinglePlan from './pages/Upgrade/SinglePlan'
import Success from './pages/Upgrade/Success'
import PublicView from './pages/PublicView/PublicView'
import UserSettings from './pages/Settings/UserSettings'
import SideMenu from './pages/Dashboard/SideMenu'

import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from './context/canvas.context'
import SupportPage from './pages/SupportPage/SupportPage'

function App() {
  const { website } = useContext(CanvasContext)
  const location = useLocation()

  const { showMenu, setShowMenu } = useContext(CanvasContext)

  const [isCompactSideMenu, setIsCompactSideMenu] = useState(false)

  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/signup'
    ) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }

    // Check if the current route is the public view
    if (location.pathname.startsWith('/webuild')) {
      setIsCompactSideMenu(true)
    } else {
      setIsCompactSideMenu(false)
    }
  }, [location.pathname])

  const sideMenuStyle = {
    flexBasis: !showMenu ? '0' : isCompactSideMenu ? '5%' : '20%',
  }

  const contentStyle = {
    flexBasis: !showMenu ? '100%' : isCompactSideMenu ? '95%' : '80%',
  }

  return (
    <div className='App'>
      <div
        style={{ ...sideMenuStyle }}
        className='side-menu'
      >
        <SideMenu isCompactSideMenu={isCompactSideMenu} setIsCompactSideMenu={setIsCompactSideMenu} />
      </div>
      <div
        style={{ ...contentStyle }}
        className='content'
      >
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
            path='/support'
            element={
              <IsPrivate>
                <SupportPage />
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
            path='/webuild/:username/:sitename/:id'
            element={<PublicView />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
