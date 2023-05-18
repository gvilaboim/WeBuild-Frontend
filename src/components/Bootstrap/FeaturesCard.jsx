import React, { useContext } from 'react'
import { Col, Form } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'

const FeaturesCard = ({
  card,
  featureName,
  onChange,
  handleDoubleClick,
  isEditing,
}) => {
  const { publicView } = useContext(CanvasContext)
  return (
    <Col
      md='6'
      className='feature'
    >
      {/* HANDLE CARD TITLE */}

      <>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='3em'
          height='3em'
          fill='currentColor'
          class='bi bi-star-fill'
          viewBox='0 0 16 16'
        >
          <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
        </svg>

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
