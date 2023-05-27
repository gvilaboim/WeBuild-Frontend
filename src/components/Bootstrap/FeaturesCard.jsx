import React, { useContext } from 'react'
import { Col, Form } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'
import { VscTools } from 'react-icons/vsc'
import { BsDatabaseAdd } from 'react-icons/bs'
import { GrDeploy } from 'react-icons/gr'
const FeaturesCard = ({
  card,
  featureName,
  onChange,
  handleDoubleClick,
  isEditing,
}) => {
  const { publicView } = useContext(CanvasContext)
  const iconsArray = [
    <VscTools size={30} />,
    <BsDatabaseAdd size={30} />,
    <GrDeploy size={30} />,
  ]
  return (
    <Col
      md='6'
      className='feature'
    >
      {/* HANDLE CARD TITLE */}

      <>
        {iconsArray[card.id]}

        {isEditing ? (
          <>
            <div className='d-flex'>
              <Form.Group className='mb-3'>
                <Form.Control
                  style={{ color: card.title.color }}
                  id={card.id}
                  name={`${card.id}.title.text`}
                  value={card.title.text}
                  type='text'
                  onChange={onChange}
                  className='my-0 font-weight-normal bg-transparent'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label>Text Color:</Form.Label>
                  <Form.Control
                    id={card.id}
                    name={`${card.id}.title.color`}
                    type='color'
                    value={card.title.color}
                    onChange={onChange}
                  />
                </div>
              </Form.Group>
            </div>
          </>
        ) : (
          <h3
            style={{ color: card.title.color }}
            className='fs-2'
            onDoubleClick={(e) => handleDoubleClick(e)}
          >
            {card.title.text}
          </h3>
        )}
      </>

      {/* HANDLE CARD DESCRIPTION */}

      <>
        {isEditing ? (
          <>
            <div className='d-flex'>
              <Form.Group className='mb-3'>
                <Form.Control
                  style={{ color: card.description.color }}
                  id={card.id}
                  name={`${card.id}.description.text`}
                  value={card.description.text}
                  type='text'
                  onChange={onChange}
                  className='my-0 font-weight-normal bg-transparent'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label>Text Color:</Form.Label>
                  <Form.Control
                    id={card.id}
                    name={`${card.id}.description.color`}
                    type='color'
                    value={card.description.color}
                    onChange={onChange}
                  />
                </div>
              </Form.Group>
            </div>
          </>
        ) : (
          <p
            style={{ color: card.description.color }}
            onDoubleClick={(e) => handleDoubleClick(e)}
          >
            {card.description.text}
          </p>
        )}
      </>

      {/* handle link changes */}

      {featureName === 'featuresA' && (
        <>
          {isEditing ? (
            <>
              <Form.Group className='mb-3'>
                <Form.Control
                  type='text'
                  id={card.id}
                  name={`${card.id}.button.text`}
                  value={card.button.text}
                  onChange={onChange}
                  className='my-0 font-weight-normal bg-transparent'
                />
                <Form.Control
                  type='text'
                  id={card.id}
                  name={`${card.id}.button.href`}
                  value={card.button.href}
                  onChange={onChange}
                  className='bg-transparent'
                />
                <Form.Control
                  id={card.id}
                  name={`${card.id}.button.color`}
                  type='color'
                  value={card.button.color}
                  onChange={onChange}
                  className='bg-transparent'
                />
              </Form.Group>
            </>
          ) : (
            <>
              <a
                style={{
                  color: card.button.color,
                }}
                className='icon-link'
                href={publicView ? `/${card.button.href}` : '#'}
                size='lg'
                onDoubleClick={(e) => handleDoubleClick(e)}
              >
                {card.button.text}
              </a>
            </>
          )}
        </>
      )}
    </Col>
  )
}

export default FeaturesCard
