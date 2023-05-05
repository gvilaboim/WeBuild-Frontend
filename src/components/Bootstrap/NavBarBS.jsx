import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { CanvasContext } from '../../context/canvas.context'
import { NavLink } from 'react-router-dom'

const NavBarBS = ({ component: { brand, navLinks } }) => {
  const { isSiteLive } = useContext(CanvasContext)

  return (
    <Navbar
      bg='light'
      expand='lg'
    >
      <Container>
        <Navbar.Brand href={isSiteLive ? '/home' : ''}>
          {brand.text}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {navLinks.map((link) => (
              <NavLink className='nav-link' key={link.text} href={isSiteLive ? `/${link.text}` : ''}>
                {link.text}
              </NavLink>
            ))}
            {/* <NavDropdown
              title='Dropdown'
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarBS
