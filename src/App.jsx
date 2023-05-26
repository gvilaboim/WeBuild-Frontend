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
import AllPlans from './pages/Dashboard/AllPlans'
import SinglePlan from './pages/Upgrade/SinglePlan'
import Success from './pages/Upgrade/Success'
import PublicView from './pages/PublicView/PublicView'
import UserSettings from './pages/Settings/UserSettings'
import SideMenu from './pages/Dashboard/SideMenu'

import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from './context/canvas.context'
import SupportPage from './pages/SupportPage/SupportPage'
import { AuthContext } from './context/auth.context'

function App() {
  const location = useLocation()
  const { website, showMenu, setShowMenu, } =
    useContext(CanvasContext)
  const { user } = useContext(AuthContext)

  const [collapseSidemenu, setCollapseSidemenu] = useState(false)

  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname.startsWith('/webuild')
    ) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }

    if (
      website &&
      website.user &&
      website.user.plan &&
      website.user.plan.name !== 'Basic'
    ) {
      setShowMenu(false)
      
    }
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapseSidemenu(false);
      } else {
        setCollapseSidemenu(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sideMenuStyle = {
    flexBasis: !showMenu ? '0' : '25%',
  }

  const contentStyle = {
    flexBasis: !showMenu ? '100%' : '75%',
  }

  return (
    <div className='App'>
      <div
        style={{ ...sideMenuStyle }}
        className='side-menu'
      >
        <SideMenu collapseSidemenu={collapseSidemenu} />
      </div>

      <div
        style={{ ...contentStyle, border: 'none' }}
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
