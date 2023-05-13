import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'

import './Bootstrap-override.css'
const Hero = ({ component, showSettings }) => {
  const { saveChanges, setContentSections } = useContext(CanvasContext)
  const { id } = useParams()

  //needed to detect clicks outside
  const wrapperRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  // saves a local copy to update and send to db laster
  const [componentData, setComponentData] = useState({
    title: component.items[0].content.title,
    subtitle: component.items[0].content.subtitle,
    primaryButton: component.items[0].content.primaryButton,
    secondaryButton: component.items[0].content.secondaryButton,
  })

  const [clickedOutside, setClickedOutside] = useState(false)

  const handleClickOutside = async (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target.parentNode)
    ) {
      setIsEditing(false)
      setClickedOutside(true)
    }
  }

  useEffect(() => {
    if (clickedOutside) {
      saveChanges(id, {
        componentToEdit: { data: componentData, id: component._id },
      })
        .then((updatedWebsite) => {
          setContentSections(updatedWebsite.sections)
          setClickedOutside(false)
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
    setIsEditing(true)
  }

  const handleChange = (e) => {
    const { value, name } = e.target

    // If the name is primaryButton or secondaryButton,
    // update the corresponding button text value
    if (name === 'titleText') {
      setComponentData((prevValue) => ({
        ...prevValue,
        title: { ...prevValue.title, text: value },
      }))
    } else if (name === 'titleColor') {
      setComponentData((prevValue) => ({
        ...prevValue,
        title: { ...prevValue.title, style: { color: value } },
      }))
    } else if (name === 'subtitleText') {
      setComponentData((prevValue) => ({
        ...prevValue,
        subtitle: { ...prevValue.subtitle, text: value },
      }))
    } else if (name === 'primaryButton') {
      setComponentData((prevValue) => ({
        ...prevValue,
        primaryButton: { ...prevValue.primaryButton, text: value },
      }))
    } else if (name === 'primaryButtonColor') {
      setComponentData((prevValue) => ({
        ...prevValue,
        primaryButton: { ...prevValue.primaryButton, backgroundColor: value },
      }))
    } else if (name === 'secondaryButton') {
      setComponentData((prevValue) => ({
        ...prevValue,
        secondaryButton: { ...prevValue.secondaryButton, text: value },
      }))
    } else if (name === 'secondaryButtonColor') {
      setComponentData((prevValue) => ({
        ...prevValue,
        secondaryButton: {
          ...prevValue.secondaryButton,
          backgroundColor: value,
        },
      }))
    } else {
      // Otherwise, update the regular component data
      setComponentData((prevValue) => ({ ...prevValue, [name]: value }))
    }
  }

  const style = component.style
  return (
    <div
      ref={wrapperRef}
      onClick={() => showSettings(component)}
      style={{
        ...style,
        height: `${style.height}px`,
        width: `${style.width}%`,
        backgroundColor: `${style.backgroundColor}`,
        background: `no-repeat  center/cover url(${style.backgroundImage})`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
      }}
    >
      <Container
        fluid='xxl'
        className='px-4 py-5'
      >
        <Row className='flex-lg-row-reverse align-items-center g-5 py-5'>
          <Col
            lg={6}
            className='text-center'
          >
            <img
              src={component.items[0].image.src}
              className='d-block mx-lg-auto img-fluid'
              alt='Bootstrap Themes'
              width={component.items[0].image.style.width}
              height={component.items[0].image.style.height}
              loading='lazy'
            />
          </Col>

          <Col lg={6}>
            {isEditing ? (
              <>
                <Form.Group className='mb-3'>
                  <Form.Control
                    name='titleText'
                    as='textarea'
                    style={{ height: '150px' }}
                    value={componentData.title.text}
                    onChange={handleChange}
                    className='input-title fw-bold lh-1 mb-3  bg-transparent'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Label>Text Color:</Form.Label>
                    <Form.Control
                      name='titleColor'
                      type='color'
                      value={componentData.title.style.color}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </>
            ) : (
              <h1
                name='title-h1'
                onDoubleClick={(e) => handleDoubleClick(e)}
                className='display-5 fw-bold text-body-emphasis lh-1 mb-3'
              >
                {componentData.title.text}
              </h1>
            )}
            {isEditing ? (
              <>
                <Form.Group
                  className='mb-3'
                  controlId='formBasicBackgroundImage'
                >
                  <Form.Control
                    name='subtitleText'
                    as='textarea'
                    style={{ height: '100px' }}
                    value={componentData.subtitle.text}
                    onChange={handleChange}
                    className='input-subtitle lead bg-transparent'
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Label>Text Color:</Form.Label>
                    <Form.Control
                      name='subtitleColor'
                      type='color'
                      value={componentData.subtitle.style.color}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </>
            ) : (
              <p
                onDoubleClick={(e) => handleDoubleClick(e)}
                className='lead'
              >
<<<<<<< HEAD
                {cmponentData.subtitle}
=======
                {componentData.subtitle.text}
>>>>>>> 9bb8c9366593f69aefece56ff16ee5ed1ee1e2ca
              </p>
            )}
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
              {isEditing ? (
<<<<<<< HEAD
                <input
                  type='text'
                  value={componentData.primaryButton.text}
                  namoe='primaryButton'
                  className='px-4 me-md-2'
                  onChange={handleChange}
                />
=======
                <>
                  <Form.Group className='mb-3'>
                    <Form.Control
                      name='primaryButton'
                      value={componentData.primaryButton.text}
                      onChange={handleChange}
                      className='input-subtitle lead bg-transparent'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Label>Button Color:</Form.Label>
                      <Form.Control
                        name='primaryButtonColor'
                        type='color'
                        style={{
                          backgroundColor:
                            componentData.primaryButton.backgroundColor,
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </>
>>>>>>> 9bb8c9366593f69aefece56ff16ee5ed1ee1e2ca
              ) : (
                <Button
                  onDoubleClick={(e) => handleDoubleClick(e)}
                  style={{
                    backgroundColor:
                      componentData.primaryButton.backgroundColor,
                  }}
                  size='lg'
                  className='px-4 me-md-2'
                >
                  {componentData.primaryButton.text}
                </Button>
              )}
              {isEditing ? (
                <>
                  <Form.Group className='mb-3'>
                    <Form.Control
                      name='secondaryButton'
                      value={componentData.secondaryButton.text}
                      onChange={handleChange}
                      className='input-subtitle lead bg-transparent'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Label>Button Color:</Form.Label>
                      <Form.Control
                        name='secondaryButtonColor'
                        type='color'
                        style={{
                          backgroundColor:
                            componentData.secondaryButton.backgroundColor,
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </>
              ) : (
                <Button
                  onDoubleClick={(e) => handleDoubleClick(e)}
                  style={{
                    backgroundColor:
                      componentData.secondaryButton.backgroundColor,
                  }}
                  size='lg'
                  className='px-4'
                >
                  {componentData.secondaryButton.text}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
