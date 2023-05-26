import { useContext, useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'

const Footer = ({ component, showSettings }) => {
  const {
    saveChanges,
    setWebsite,
    publicView,
    setShowSettingsSidebar,
    setSelectedComponent,
    website,
  } = useContext(CanvasContext)

  const year = new Date().getFullYear()

  const { id } = website?._id
  const wrapperRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [clickedOutside, setClickedOutside] = useState(false)

  const [componentData, setComponentData] = useState({
    header1: {},
    header2: {},
    header3: {},
  })

  useEffect(() => {
    if (
      component &&
      component.items &&
      component.items[0] &&
      component.items[0].content &&
      component.items[0].content.headers
    ) {
      setComponentData({
        header1: component.items[0].content.headers[0],
        header2: component.items[0].content.headers[1],
        header3: component.items[0].content.headers[2],
      })
    }
  }, [component])

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
  }, [clickedOutside, componentData, hasChanges, id, saveChanges, setWebsite])

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

  // Utility function to update nested properties in an object
  const set = (obj, path, value) => {
    const parts = path.split('.')
    const lastIndex = parts.length - 1
    return parts.reduce((acc, current, index) => {
      if (index === lastIndex) {
        acc[current] = value
      } else {
        if (!acc[current]) {
          acc[current] = {}
        }
      }
      return acc[current]
    }, obj)
  }

  // Changes to the top variables (not nested in the Card)
  const handleChange = (e, name) => {
    const { value } = e.target

    setHasChanges(true)

    if (name.startsWith('header')) {
      const headerIndex = Number(name.split('.')[0].replace('header', ''))
      const linkIndex = Number(name.split('.')[1])

      setComponentData((prevValue) =>
        set(
          { ...prevValue },
          `header${headerIndex}.links[${linkIndex}].text`,
          value
        )
      )
    } else if (name.startsWith('color')) {
      const headerIndex = Number(name.split('.')[0].replace('color', ''))
      const linkIndex = Number(name.split('.')[1])

      setComponentData((prevValue) =>
        set(
          { ...prevValue },
          `header${headerIndex}.links[${linkIndex}].color`,
          value
        )
      )
    }
  }
  const toggleSidebar = () => {
    if (!isEditing) {
      setSelectedComponent(component)
      showSettings(component)
    }
    console.log(component)
  }

  const style = component?.style

  return (
    <div>
      <Container
        expand='lg'
        className='mb-3'
        onDoubleClick={toggleSidebar}
        style={{
          ...style,
          alignItems: `${style?.alignItems || ''}`,
          height: `${style?.height || ''}px`,
          width: `${style?.width || ''}%`,
          background: `no-repeat center/cover url(${
            style?.backgroundImage || ''
          })`,
          padding: `${style?.padding?.top || ''}% ${
            style?.padding?.right || ''
          }% ${style?.padding?.bottom || ''}% ${style?.padding?.left || ''}%`,
          backgroundColor: `${style?.backgroundColor} !important`,
        }}
        fluid
      >
        <Row className='border-top py-5 my-5 '>
          <Col mb={3}>
            {componentData &&
              componentData.header1 &&
              componentData.header1.header && (
                <h5>{componentData.header1.header.text}</h5>
              )}
            <Nav className='flex-column'>
              <Nav.Item className='mb-2'>
                <>
                  {componentData.header1.links &&
                    componentData.header1.links.length > 0 && (
                      <Nav.Link
                        href={componentData.header1.links[0].href}
                        className='nav-link p-0 text-body-secondary'
                        onDoubleClick={handleDoubleClick}
                        style={{
                          color: componentData.header1?.links[0]?.color,
                        }}
                      >
                        {componentData.header1?.links[0]?.text}
                      </Nav.Link>
                    )}
                </>
              </Nav.Item>
              <Nav.Item className='mb-2'>
                {componentData.header1.links &&
                  componentData.header1.links.length > 0 && (
                    <Nav.Link
                      href={componentData.header1?.links[1]?.href}
                      className='nav-link p-0 text-body-secondary'
                    >
                      {componentData.header1?.links[1]?.text}
                    </Nav.Link>
                  )}
              </Nav.Item>
              <Nav.Item className='mb-2'>
                {componentData.header1.links &&
                  componentData.header1.links.length > 0 && (
                    <Nav.Link
                      href={componentData.header1?.links[2]?.href}
                      className='nav-link p-0 text-body-secondary'
                    >
                      {componentData.header1?.links[2]?.text}
                    </Nav.Link>
                  )}
              </Nav.Item>
              <Nav.Item className='mb-2'>
                {componentData.header1.links &&
                  componentData.header1.links.length > 0 && (
                    <Nav.Link
                      href={componentData.header1?.links[3]?.href}
                      className='nav-link p-0 text-body-secondary'
                    >
                      {componentData.header1?.links[3].text}
                    </Nav.Link>
                  )}
              </Nav.Item>
              <Nav.Item className='mb-2'>
                {componentData.header1.links &&
                  componentData.header1.links.length > 0 && (
                    <Nav.Link
                      href={componentData.header1?.links[4].href}
                      className='nav-link p-0 text-body-secondary'
                    >
                      {componentData.header1?.links[4].text}
                    </Nav.Link>
                  )}
              </Nav.Item>
            </Nav>
          </Col>

          <Col mb={3}>
            {componentData &&
              componentData.header2 &&
              componentData.header2.header && (
                <>
                  {componentData.header2.header.text && (
                    <h5>{componentData.header2.header.text}</h5>
                  )}

                  <Nav className='flex-column'>
                    <Nav.Item className='mb-2'>
                      {componentData.header2.links &&
                        componentData.header2.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header2?.links[0].href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header2?.links[0].text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                      {componentData.header2.links &&
                        componentData.header2.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header2?.links[1].href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header2?.links[1].text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                    {componentData.header2.links &&
                        componentData.header2.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header2?.links[2].href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header2?.links[2].text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                    {componentData.header2.links &&
                        componentData.header2.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header2?.links[3].href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header2?.links[3].text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                    {componentData.header2.links &&
                        componentData.header2.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header2?.links[4].href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header2?.links[4].text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                  </Nav>
                </>
              )}
          </Col>
          <Col mb={3}>
            {componentData &&
              componentData.header3 &&
              componentData.header3.header && (
                <>
                  {componentData.header3.header.text && (
                    <h5>{componentData.header3?.header?.text}</h5>
                  )}

                  <Nav className='flex-column'>
                    <Nav.Item className='mb-2'>
                    {componentData.header3.links &&
                        componentData.header3.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header3?.links[0]?.href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header3?.links[0]?.text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                    {componentData.header3.links &&
                        componentData.header3.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header3?.links[1]?.href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header3?.links[1]?.text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                    {componentData.header3.links &&
                        componentData.header3.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header3?.links[2]?.href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header3?.links[2]?.text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                    {componentData.header3.links &&
                        componentData.header3.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header3?.links[3]?.href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header3?.links[3]?.text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                    {componentData.header3.links &&
                        componentData.header3.links.length > 0 && (
                          <Nav.Link
                            href={componentData.header3?.links[4]?.href}
                            className='nav-link p-0 text-body-secondary'
                          >
                            {componentData.header3?.links[4]?.text}
                          </Nav.Link>
                        )}
                    </Nav.Item>
                  </Nav>
                </>
              )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
