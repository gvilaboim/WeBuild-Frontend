import React, { useContext, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Button, Image, Form } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'
import { useParams } from 'react-router-dom'
import { set } from 'lodash'
import { FaEdit } from 'react-icons/fa'

const ImageRight = ({ component, showSettings }) => {
  const {
    setWebsite,
    saveChanges,
    publicView,
    setShowSettingsSidebar,
    isSaving,
    isMobile,
    isTablet,
  } = useContext(CanvasContext)
  const { id } = useParams()

  //needed to detect clicks outside
  const wrapperRef = useRef(null)
  const editBtnRef = useRef(null)

  const [hasChanges, setHasChanges] = useState(false)
  const [clickedOutside, setClickedOutside] = useState(false)

  const [isEditing, setIsEditing] = useState(false)

  const [timestamp, setTimestamp] = useState(Date.now())

  const [componentData, setComponentData] = useState({
    title: component.items[0]?.content?.title,
    description: component.items[0]?.content?.description,
    image: component.items[0]?.content?.image,
  })

  useEffect(() => {
    console.log(isSaving)
    if (isSaving) {
      setTimestamp(Date.now()) // Unique value
    }
  }, [isSaving])

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
      console.log('Sending changes', componentData.items)
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

  const handleChange = (e) => {
    const { value, name } = e.target
    setHasChanges(true)
    setComponentData((prevValue) => set({ ...prevValue }, name, value))
  }

  const toggleSidebar = (e) => {
    // check added to prevent the right customization menu from taking the whole screen on mobile
    //it will not popup if the user clicks the edit button on mobile
    if (
      e.target !== editBtnRef.current.children[0] &&
      e.target.parentNode !== editBtnRef.current.children[0]
    )
      showSettings(component)
  }
  const style = component.style
  return (
    <div
      ref={wrapperRef}
      onClick={toggleSidebar}
      style={{
        ...style,
        minHeight: `${style.height}px`,
        width: `${style.width}%`,
        background: `no-repeat  center/cover url(${style.backgroundImage}) ${style.backgroundColor}`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
        opacity: `${style.opacity}`,
      }}
    >
       {(isMobile || isTablet) && !publicView && (
            <Button
              variant='outline-dark'
              style={{ position: 'absolute', top: '0.5em', left: '3.2em' }}
              ref={editBtnRef}
              name='edit-btn'
              onClick={handleDoubleClick}
            >
              <FaEdit size={20} />
            </Button>
          )}
      <Row className='featurette'>
        <Col md={7}>
          {isEditing ? (
            <>
              <Form.Group className='mb-3'>
                <Form.Control
                  name='title.text'
                  as='textarea'
                  style={{ color: componentData.title.color }}
                  value={componentData.title.text}
                  onChange={handleChange}
                  className='input-title fw-bold lh-1 mb-3  bg-transparent'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label>Text Color:</Form.Label>
                  <Form.Control
                    name='title.color'
                    type='color'
                    value={componentData.title.color}
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
              style={{ color: componentData.title.color }}
            >
              {componentData.title.text}
            </h1>
          )}

          {isEditing ? (
            <>
              <Form.Group className='mb-3'>
                <Form.Control
                  name='description.text'
                  as='textarea'
                  style={{ color: componentData.description.color }}
                  value={componentData.description.text}
                  onChange={handleChange}
                  className='input-title fw-bold lh-1 mb-3  bg-transparent'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label>Text Color:</Form.Label>
                  <Form.Control
                    name='description.color'
                    type='color'
                    value={componentData.description.color}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </>
          ) : (
            <p
              name='title-h1'
              onDoubleClick={(e) => handleDoubleClick(e)}
              style={{ color: componentData.description.color }}
              className='lead'
            >
              {componentData.description.text}
            </p>
          )}
        </Col>
        <Col md={5}>
          <Image
            key={isSaving ? Date.now() : undefined}
            src={`${componentData.image.src}?cache=${timestamp}`}
            alt={componentData.image.src}
            fluid
          />
        </Col>
      </Row>
    </div>
  )
}

export default ImageRight
