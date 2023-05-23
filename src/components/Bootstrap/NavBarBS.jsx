import { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import { CanvasContext } from '../../context/canvas.context'
import { NavLink } from 'react-router-dom'

const NavBarBS = ({  showSettings, component: { brand, navLinks }, component }) => {
  const { publicView, website, setSelectedComponent ,menu , setMenu , ChangeMenu} = useContext(CanvasContext)
  const [isEditing, setIsEditing] = useState(false)

  const toggleSidebar = () => {
    console.log("ALGUMA CENA BOY")

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
      expand='lg'
      className='mb-3'
      onDoubleClick={toggleSidebar}
      style={{
        ...style,
        alignItems: `${style?.alignItems || ''}`,
        height: `${style?.height || ''}px`,
        width: `${style?.width || ''}%`,
        background: `no-repeat center/cover url(${style?.backgroundImage || ''})`,
        padding: `${style?.padding?.top || ''}% ${style?.padding?.right || ''}% ${style?.padding?.bottom || ''}% ${style?.padding?.left || ''}%`,
        backgroundColor: style?.backgroundColor || ''
      }}
    >
        <Container >
          <Navbar.Brand href={publicView ? '/home' : ''}>
            {website.name}
  
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>

            <Nav className='ms-auto'>
              {navLinks && navLinks.map((link , index) => (
                <NavLink
                  className='nav-link'
                  key={link.text}
                  href={publicView ? `/${link.text}` : ''}
                  onClick={ () =>  { ChangeMenu(index) ; console.log(index)}}
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
