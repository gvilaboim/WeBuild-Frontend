import { useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Pricing = ({ component }) => {
  const [localComponent, setLocalComponent] = useState(component.items[0])

  console.log(localComponent)

  return (
    <div>
      <Container>
        <h1 className='display-4 text-center'>{localComponent.title.text}</h1>
        <p className='lead text-center'>{localComponent.subtitle.text}</p>
        <Row className='justify-content-md-center'>
          {localComponent.cards.map((card) => {
            return (
              <Col md='4'>
                <Card className='mb-4 box-shadow'>
                  <Card.Header>
                    <h4 className='my-0 font-weight-normal'>
                      {card.header.text}
                    </h4>
                  </Card.Header>
                  <Card.Body>
                    <h1 className='card-title pricing-card-title'>
                      {card.body.price.currency}
                      {card.body.price.value}
                      <small className='text-muted'>
                        {card.body.price.paymentFrequency}
                      </small>
                    </h1>
                    <ul className='list-unstyled mt-3 mb-4'>
                      {card.body.listedItems.map((listedItem) => (
                        <li>{listedItem.text}</li>
                      ))}
                    </ul>
                    <Button
                      variant={card.body.button.variant}
                      href={card.body.button.href}
                      size='lg'
                      block
                    >
                      {card.body.button.text}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Pricing
