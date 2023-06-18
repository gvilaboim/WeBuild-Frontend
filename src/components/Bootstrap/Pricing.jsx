import { useContext, useEffect, useRef, useState } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'
import PricingCard from './PricingCard'
import { set } from 'lodash'
import { FaEdit } from 'react-icons/fa'
const Pricing = ({ component, showSettings }) => {
  const {
    setWebsite,
    saveChanges,
    publicView,
    setShowSettingsSidebar,
    isMobile,
    isTablet,
  } = useContext(CanvasContext)
  const { id } = useParams()

  const wrapperRef = useRef(null)
  const editBtnRef = useRef(null)

  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [clickedOutside, setClickedOutside] = useState(false)

  const [componentData, setComponentData] = useState({
    title: component.items[0].content.title,
    subtitle: component.items[0].content.subtitle,
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

  // changes to values within the cards
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

  // changes to the listed variables in the Card Body
  const handleListItemChange = (event, index, cardIndex) => {
    const { name, value } = event.target

    setHasChanges(true)

    setComponentData((prevComponentData) => {
      const updatedCards = prevComponentData.cards.map(
        (card, currentCardIndex) => {
          if (currentCardIndex === cardIndex) {
            const updatedListedItems = card.body.listedItems.map(
              (item, currentIndex) => {
                if (currentIndex === index) {
                  return { ...item, [name]: value }
                }
                return item
              }
            )

            return {
              ...card,
              body: { ...card.body, listedItems: updatedListedItems },
            }
          }
          return card
        }
      )

      return { ...prevComponentData, cards: updatedCards }
    })
  }

  // changes to the top variables (not nested in the Card)
  const handleChange = (e, id) => {
    const { value, name } = e.target

    setHasChanges(true)

    if (name.startsWith('title')) {
      setComponentData((prevValue) =>
        set({ ...prevValue }, `title.${name.split('.')[1]}`, value)
      )
    } else if (name.startsWith('subtitle')) {
      setComponentData((prevValue) =>
        set({ ...prevValue }, `subtitle.${name.split('.')[1]}`, value)
      )
    } else {
      // Otherwise, update the regular component data
      setComponentData((prevValue) => set({ ...prevValue }, name, value))
    }
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
      <Container>
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
        {/* HANDLE TITLE EDITS */}

        {isEditing ? (
          <div className='d-flex'>
            <Form.Group className='mb-3'>
              <Form.Control
                name='title.text'
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
                  name='title.color'
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
                name='subtitle.text'
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
                  name='subtitle.color'
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
                onChange={handleCardChanges}
                handleListItemChange={handleListItemChange}
              />
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Pricing
