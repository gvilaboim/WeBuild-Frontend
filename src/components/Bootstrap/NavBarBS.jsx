import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { CanvasContext } from '../../context/canvas.context'
import { NavLink } from 'react-router-dom'

const NavBarBS = ({ component: { brand, navLinks } }) => {
  const { publicView } = useContext(CanvasContext)

  return (
    <>
      <Navbar
        bg='light'
        expand='lg'
        className='mb-3'
      >
        <Container>
          <Navbar.Brand href={publicView ? '/home' : ''}>
            {brand.text}
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
