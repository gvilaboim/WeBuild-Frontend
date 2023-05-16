import React from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'

const PricingCard = ({ card, onChange, handleDoubleClick, isEditing }) => {


  return (
    <Col md='4'>
      <Card className='mb-4 box-shadow'>
        {/* HANDLE CARD HEADER */}

        <Card.Header>
          <>
            {isEditing ? (
              <>
                <div className='d-flex'>
                  <Form.Group className='mb-3'>
                    <Form.Control
                      id={card.id}
                      name={`${card.id}.header.text`}
                      type='text'
                      value={card.header.text}
                      onChange={onChange}
                      className='my-0 font-weight-normal bg-transparent'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Label>Text Color:</Form.Label>
                      <Form.Control
                        id={card.id}
                        name='cardHeaderColor'
                        type='color'
                        value={card.header.color}
                        onChange={onChange}
                      />
                    </div>
                  </Form.Group>
                </div>
              </>
            ) : (
              <h4
                className='my-0 font-weight-normal'
                onDoubleClick={(e) => handleDoubleClick(e)}
              >
                {card.header.text}
              </h4>
            )}
          </>
        </Card.Header>

        {/* HANDLE CARD BODY */}

        <Card.Body>
          {isEditing ? (
            <>
              <Form.Group
                className='mb-3 w-100'
                controlId='formBasicBackgroundImage'
              >
                <div className='d-flex'>
                  <Form.Control
                    name='cardPriceCurrency'
                    type='text'
                    value={card.body.price.currency}
                    onChange={onChange}
                    className='bg-transparent'
                  />
                  <Form.Control
                    name='cardPriceValue'
                    type='number'
                    value={card.body.price.value}
                    onChange={onChange}
                    className='bg-transparent'
                  />
                  <Form.Control
                    name='cardPaymentFrequency'
                    type='text'
                    value={card.body.price.paymentFrequency}
                    onChange={onChange}
                    className='bg-transparent'
                  />
                </div>
              </Form.Group>
            </>
          ) : (
            <>
              <h1
                className='card-title pricing-card-title'
                onDoubleClick={(e) => handleDoubleClick(e)}
              >
                {card.body.price.currency}
                {card.body.price.value}
                <small className='text-muted'>
                  {card.body.price.paymentFrequency}
                </small>
              </h1>
            </>
          )}
          <ul
            className='list-unstyled mt-3 mb-4'
            onDoubleClick={(e) => handleDoubleClick(e)}
          >
            <Form.Group className='mb-3'>
              {card.body.listedItems.map((listedItem, index) => {
                return isEditing ? (
                  <Form.Control
                    name={`listedItems[${index}].text`}
                    id={`listedItem-${index}`}
                    value={listedItem.text}
                    onChange={onChange}
                    className='bg-transparent'
                  />
                ) : (
                  <>
                    <li>{listedItem.text}</li>
                  </>
                )
              })}
            </Form.Group>
          </ul>
          {isEditing ? (
            <>
              <Form.Group className='mb-3'>
                <Form.Control
                  name='cardButtonText'
                  type='text'
                  value={card.body.button.text}
                  onChange={onChange}
                  className='my-0 font-weight-normal bg-transparent'
                />
                <Form.Control
                  name='cardButtonHref'
                  type='text'
                  value={card.body.button.href}
                  onChange={onChange}
                  className='bg-transparent'
                />
                <Form.Control
                  name='cardButtonColor'
                  type='color'
                  value={card.body.button.backgroundColor}
                  onChange={onChange}
                  className='bg-transparent'
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Button
                style={{
                  backgroundColor: card.body.button.backgroundColor,
                }}
                href={card.body.button.href}
                size='lg'
                onDoubleClick={(e) => handleDoubleClick(e)}
              >
                {card.body.button.text}
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default PricingCard
