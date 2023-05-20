import { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { CanvasContext } from '../../context/canvas.context'
import { NavLink } from 'react-router-dom'

const NavBarBS = ({ showSettings, component: { brand, navLinks }, component }) => {
  const { publicView, website, setSelectedComponent } = useContext(CanvasContext)
  const [isEditing, setIsEditing] = useState(false)

  const toggleSidebar = () => {
    if (!isEditing) {
      setSelectedComponent(component)
      showSettings(component)
    }
    console.log(component)
  }
  const style = component.style

  return (
    <>
      <Navbar
        bg='light'
        expand='lg'
        className='mb-3'
        onClick={toggleSidebar}
        onDoubleClick={() => setIsEditing(true)}
        style={{
          ...style,
          textAlign: `${style.textAlign}`,
          height: `${style.height}px`,
          width: `${style.width}%`,
          background: `no-repeat center/cover url(${style.backgroundImage})`,
          padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
          backgroundColor: style.backgroundColor
        }}
      >
        <Container>
          <Navbar.Brand href={publicView ? '/home' : ''}>
            {website.name}
          
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {navLinks && navLinks.map((link) => (
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
