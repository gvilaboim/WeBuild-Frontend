import { useContext, useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'
import PricingCard from './PricingCard'

const Pricing = ({ component, showSettings }) => {
  const { saveChanges, setContentSections, publicView } =
    useContext(CanvasContext)
  const { id } = useParams()

  const wrapperRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  const [componentData, setComponentData] = useState({
    title: component.items[0].title,
    subtitle: component.items[0].subtitle,
    cards: component.items[0].cards,
  })

  const [clickedOutside, setClickedOutside] = useState(false)

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
    if (!publicView) setIsEditing(true)
  }

  const handleChange = (e) => {


    const { name, value } = e.target
    const [index, propName] = name.split('.')
    
    
    const updatedCards = componentData.cards.map((card) => {
      
      if (card.id === parseInt(cardId)) {
        
        return {
          ...card,
          [propName]: {
            ...card[propName],
            [propValue]: value,
          },
        }
      }
      return card
    })
    setComponentData((prevValue) => ({ ...prevValue, cards: updatedCards }))
  }

  // const handleChange = (e, id) => {
  //   const { value, name } = e.target

  //   if (name === 'titleText') {
  //     setComponentData((prevValue) => ({
  //       ...prevValue,
  //       title: { ...prevValue.title, text: value },
  //     }))
  //   } else if (name === 'titleColor') {
  //     setComponentData((prevValue) => ({
  //       ...prevValue,
  //       title: { ...prevValue.title, color: value },
  //     }))
  //   } else if (name === 'subtitleText') {
  //     setComponentData((prevValue) => ({
  //       ...prevValue,
  //       subtitle: { ...prevValue.subtitle, text: value },
  //     }))
  //   } else if (name === 'subtitleColor') {
  //     setComponentData((prevValue) => ({
  //       ...prevValue,
  //       subtitle: { ...prevValue.subtitle, color: value },
  //     }))
  //   } else {
  //     console.log(name, value)
  //     // Otherwise, update the regular component data
  //     setComponentData((prevValue) => ({ ...prevValue, [name]: value }))
  //   }
  // }

  const style = component.style

  return (
    <div
      ref={wrapperRef}
      onClick={() => showSettings(component)}
      style={{
        ...style,
        minHeight: `${style.height}px`,
        width: `${style.width}%`,
        backgroundColor: `${style.backgroundColor}`,
        background: `no-repeat  center/cover url(${style.backgroundImage})`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
      }}
    >
      <Container>
        {/* HANDLE TITLE EDITS */}

        {isEditing ? (
          <div className='d-flex'>
            <Form.Group className='mb-3'>
              <Form.Control
                name='titleText'
                as='textarea'
                value={componentData.title.text}
                onChange={handleChange}
                className='fw-bold lh-1  bg-transparent'
              />
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
                  name='titleColor'
                  type='color'
                  value={componentData.title.color}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </div>
        ) : (
          <>
            <h1
              name='title-h1'
              onDoubleClick={(e) => handleDoubleClick(e)}
              className='display-5 fw-bold text-body-emphasis lh-1 mb-3'
              style={{ color: componentData.title.color }}
            >
              {componentData.title.text}
            </h1>
          </>
        )}

        {/* HANDLE SUBTITLE EDITS */}

        {isEditing ? (
          <div className='d-flex'>
            <Form.Group className='mb-3 w-100'>
              <Form.Control
                name='subtitleText'
                as='textarea'
                style={{ height: '100px', width: '100%' }}
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
                  value={componentData.subtitle.color}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </div>
        ) : (
          <p
            onDoubleClick={(e) => handleDoubleClick(e)}
            className='lead'
            style={{ color: componentData.subtitle.color }}
          >
            {componentData.subtitle.text}
          </p>
        )}

        {/* HANDLE EACH CARD */}

        <Row className='justify-content-md-center'>
          {componentData.cards.map((card) => {
            return (
              <PricingCard
                key={card.id}
                card={card}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleDoubleClick={handleDoubleClick}
                onChange={handleChange}
              />
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Pricing
