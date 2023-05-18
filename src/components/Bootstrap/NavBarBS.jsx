import { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { CanvasContext } from '../../context/canvas.context'
import { NavLink } from 'react-router-dom'

const NavBarBS = ({ showSettings,  component: { brand, navLinks }  , component}) => {
  const { publicView , websiteInfo } = useContext(CanvasContext)
  const [isEditing, setIsEditing] = useState(false)

  const toggleSidebar = () => {
    if (!isEditing) showSettings(component)
  }
  
  return (
    <>
      <Navbar
        bg='light'
        expand='lg'
        className='mb-3'
        onClick={toggleSidebar}
      >
        <Container>
          <Navbar.Brand href={publicView ? '/home' : ''}>
            {websiteInfo.name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {navLinks.map((link) => (
                <NavLink
                  className='nav-link'
                  key={link.text}
                  href={publicView ? `/${link.text}` : ''}
                >
                  {link.text}
                </NavLink>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBarBS
