import { Container, Row, Form } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { set } from 'lodash'
import FeaturesCard from './FeaturesCard'

const FeaturesA = ({ component, showSettings }) => {
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
        background: `no-repeat  center/cover url(${style.backgroundImage})`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
      }}
    >
      <Container fluid>
        <Container
          className='px-4 py-5'
          id={`featured-0`}
        >
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

          <Row className='g-4 py-5 row-cols-1 row-cols-lg-3'>
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
        </Container>
      </Container>
    </div>
  )
}

export default FeaturesA
