import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import Button from 'react-bootstrap/Button'
import { CanvasContext } from '../../context/canvas.context'
import './NavigationBar.css'
const NavigationBar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const { fetchUserInfo, userPlan, publicView } = useContext(CanvasContext)
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserInfo(user._id)
    }
  }, [user])

  const handleNavbarVisibility = () => {
    if (publicView) {
      setShowNavbar((previousValue) => !previousValue)
    }
    
  }

  return (
    <>
      <Navbar
        bg='dark'
        variant='dark'
        className='z-index-2 sticky-top'
        onMouseEnter={handleNavbarVisibility}
        onMouseLeave={handleNavbarVisibility}
      >
        <Container>
          <Navbar.Brand href='/'>WeBuild</Navbar.Brand>
          {showNavbar && (
            <>
              <Nav className='me-auto'>
                <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                <Nav.Link href='/upgrade'>Pricing</Nav.Link>
                <Nav.Link href='/settings'>Settings</Nav.Link>
                <Nav.Link href='/'>WebSites Find</Nav.Link>
              </Nav>
              {isLoggedIn && (
                <Nav className='ms-auto'>
                  {userPlan && (
                    <Navbar.Text className='me-2'>
                      Plan: <a href='/account'>{userPlan.name}</a>
                    </Navbar.Text>
                  )}
                  <Navbar.Text className='me-2'>
                    Signed in as: <a href='/account'>{user.name}</a>
                  </Navbar.Text>

                  <Button
                    className='me-1'
                    variant='info'
                    onClick={logOutUser}
                  >
                    Log Out
                  </Button>
                  <Button
                    variant='light'
                    href='/upgrade'
                  >
                    Upgrade
                  </Button>
                </Nav>
              )}

              {!isLoggedIn && (
                <Nav className='ms-auto'>
                  <Nav.Link href='/signup'>Signup</Nav.Link>
                  <Nav.Link href='/login'>Login</Nav.Link>
                  <Button
                    variant='light'
                    href='/premium'
                  >
                    Upgrade
                  </Button>
                </Nav>
              )}
            </>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
