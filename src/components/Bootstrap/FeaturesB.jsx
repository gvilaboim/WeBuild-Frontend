import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { set } from 'lodash'
import FeaturesCard from './FeaturesCard'
import { FaEdit } from 'react-icons/fa'

const FeaturesB = ({ component, showSettings }) => {
  const { saveChanges, setWebsite, publicView, setShowSettingsSidebar,isMobile, isTablet } =
    useContext(CanvasContext)
  const { id } = useParams()
  const wrapperRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [clickedOutside, setClickedOutside] = useState(false)

  const [componentData, setComponentData] = useState({
    title: component.items[0].content.title,
    description: component.items[0].content.description,
    button: component.items[0].content.button,
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
  const handleCardChanges = (e) => {
    const { name, value } = e.target
    const [cardIndex, propName1, propName2, propName3] = name.split('.')

    setHasChanges(true)

    if (!propName3) {
      const updatedCards = componentData.cards.map((card, index) => {
        if (index === parseInt(cardIndex)) {
          const updatedCard = { ...card }
          set(updatedCard, `${propName1}.${propName2}`, value)

          return updatedCard
        }
        return card
      })
      setComponentData((prevValue) => ({ ...prevValue, cards: updatedCards }))
    } else {
      const updatedCards = componentData.cards.map((card, index) => {
        if (index === parseInt(cardIndex)) {
          const updatedCard = { ...card }
          set(updatedCard, `${propName1}.${propName2}.${propName3}`, value)

          return updatedCard
        }
        return card
      })
      setComponentData((prevValue) => ({ ...prevValue, cards: updatedCards }))
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
        background: `no-repeat center/cover url(${style.backgroundImage})`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
        opacity: `${style.opacity}`,
      }}
    >
      <Container className='px-4 py-5'>
      {isMobile ||
          (isTablet && (
            <Button
              variant='outline-dark'
              style={{ position: 'absolute', top: '0.8em', left: '3.2em' }}
              onClick={handleDoubleClick}
            >
              <FaEdit size={20} />
            </Button>
          ))}
        {isEditing ? (
          <>
            <Form.Group className='mb-3'>
              <Form.Control
                name='title.text'
                value={componentData.title.text}
                onChange={handleChange}
                style={{ color: componentData.title.color }}
                className='display-5 fw-bold text-body-emphasis lh-1 mb-3'
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Form.Label className='fs-5'>Text Color:</Form.Label>
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
          <h2
            name='title-h1'
            onDoubleClick={(e) => handleDoubleClick(e)}
            className='pb-2 border-bottom'
            style={{ color: componentData.title.color }}
          >
            {componentData.title.text}
          </h2>
        )}
        <Row className='row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5'>
          <Col className='d-flex flex-column align-items-start gap-2'>
            {isEditing ? (
              <>
                <Form.Group className='mb-3'>
                  <Form.Control
                    name='description.text'
                    value={componentData.description.text}
                    onChange={handleChange}
                    style={{ color: componentData.description.color }}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3'
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Form.Label className='fs-5'>Text Color:</Form.Label>
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
              <h2
                name='description-h2'
                onDoubleClick={(e) => handleDoubleClick(e)}
                className='text-body-secondary'
                style={{ color: componentData.description.color }}
              >
                {componentData.description.text}
              </h2>
            )}

            {isEditing ? (
              <>
                <Form.Group className='mb-3'>
                  <Form.Control
                    name='button.text'
                    value={componentData.button.text}
                    onChange={handleChange}
                    style={{
                      color: componentData.button.color,
                      backgroundColor: componentData.button.backgroundColor,
                    }}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3'
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Form.Label className='fs-5'>Text Color:</Form.Label>
                    <Form.Control
                      name='button.color'
                      type='color'
                      value={componentData.button.color}
                      onChange={handleChange}
                    />
                    <Form.Label className='fs-5'>Background Color:</Form.Label>
                    <Form.Control
                      name='button.backgroundColor'
                      type='color'
                      value={componentData.button.backgroundColor}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
              </>
            ) : (
              <Button
                name='button'
                onDoubleClick={(e) => handleDoubleClick(e)}
                href={publicView ? `${componentData.button.href}` : '#'}
                style={{
                  color: componentData.button.color,
                  backgroundColor: componentData.button.backgroundColor,
                }}
              >
                {componentData.button.text}
              </Button>
            )}
          </Col>
          <Col>
            <Row className='row-cols-1 row-cols-sm-2 g-4'>
              {componentData.cards.map((card) => {
                return (
                  <FeaturesCard
                    key={card.id}
                    card={card}
                    featureName={component.name}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleDoubleClick={handleDoubleClick}
                    onChange={handleCardChanges}
                  />
                )
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FeaturesB
