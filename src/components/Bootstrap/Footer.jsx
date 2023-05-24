import { useContext, useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'
import { useParams } from 'react-router-dom'

const Footer = ({ component }) => {

  const year = new Date().getFullYear()
  const { saveChanges, setWebsite, publicView, setShowSettingsSidebar } =
  useContext(CanvasContext)
const { id } = useParams()
const wrapperRef = useRef(null)

const [isEditing, setIsEditing] = useState(false)
const [hasChanges, setHasChanges] = useState(false)
const [clickedOutside, setClickedOutside] = useState(false)

const [componentData, setComponentData] = useState({
  title: component.items[0].content.title,
  icon: component.items[0].content.icon,
  cards: component.items[0].content.cards,
})

const handleClickOutside = async (event) => {
  if (!publicView) {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target.parentNode)
    ) {
      setIsEditing(false)
      setClickedOutside(true)
    }
  }
}

useEffect(() => {
  if (clickedOutside && hasChanges) {
    saveChanges(id, {
      componentToEdit: { data: componentData, id: component._id },
    })
      .then((updatedWebsite) => {
        setWebsite(updatedWebsite)
        setClickedOutside(false)
        setHasChanges(false)
      })
      .catch((err) => console.log(err))
  }
}, [clickedOutside])

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside)
  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [])

const handleDoubleClick = (e) => {
  if (!publicView) {
    setIsEditing(true)
    setShowSettingsSidebar(false)
  }
}

// changes to the top variables (not nested in the Card)
const handleChange = (e, id) => {
  const { value, name } = e.target

  setHasChanges(true)

  if (name.startsWith('title')) {
    setComponentData((prevValue) =>
      set({ ...prevValue }, `title.${name.split('.')[1]}`, value)
    )
  } else {
    // Otherwise, update the regular component data
    setComponentData((prevValue) => set({ ...prevValue }, name, value))
  }
}

const toggleSidebar = () => {
  if (!isEditing) showSettings(component)
}

const style = component.style

  return (
    <div
    ref={wrapperRef}
    onClick={toggleSidebar}
    style={{
      ...style,
      textAlign: 'left',
      height: `${style.height}px`,
      width: `${style.width}%`,
      backgroundColor: `${style.backgroundColor}`,
      background: `no-repeat  center/cover url(${style.backgroundImage})`,
      padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
    }}
  >
    <Container>
      <Row className='border-top py-5 my-5 '>
        <Col mb={3}>
          <a
            href={publicView ? '/' : '#'}
            className='d-flex align-items-center mb-3 link-body-emphasis text-decoration-none'
          >
            <p>{website?.name}</p>
          </a>
          <p className='text-body-secondary'>&copy; {year}</p>
        </Col>

        <Col mb={3}></Col>

        {component.items.length > 0 &&
          component.items.map((item, index) => {
            return (
              <>
                <Col key={index} mb={3}>
                  <h5>{item.header.text}</h5>
                  <Nav className='flex-column'>
                    <Nav.Item className='mb-2'>
                      {item.links.map((link, linkIndex) => (
                        <Nav.Link
                        key={linkIndex}
                          href={link.href}
                          className='nav-link p-0 text-body-secondary'
                        >
                          {link.text}
                        </Nav.Link>
                      ))}
                    </Nav.Item>
                  </Nav>
                </Col>
              </>
            )
          })}
      </Row>
    </Container>
    </div>
  )
}

export default Footer
