import { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Blog = ({ component }) => {
  const [localComponent, setLocalComponent] = useState(component.items[0])

  console.log(localComponent)

  return (
    <div>
      <Container>
        <h1 className='display-4 text-center'>{localComponent && localComponent.title && localComponent.title.text}</h1>
        <Row className='mb-4'>
          {localComponent && localComponent.cards && localComponent.cards.map((card) => {
            return (
              <Col md={6}>
                <Card className='border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
                  <div className='col p-4 d-flex flex-column position-static'>
                    <strong className='d-inline-block mb-2 text-white' style={{ backgroundColor: card.categoryTag && `rgba(${card.categoryTag.bgColor.r}, ${card.categoryTag.bgColor.g}, ${card.categoryTag.bgColor.b}, ${card.categoryTag.bgColor.a})`, color: card.categoryTag && `rgba(${card.categoryTag.textColor.r}, ${card.categoryTag.textColor.g}, ${card.categoryTag.textColor.b}, ${card.categoryTag.textColor.a})` }}>
                      {card.categoryTag && card.categoryTag.text}
                    </strong>
                    <h3 className='mb-0'>{card.header && card.header.text}</h3>
                    <div className='mb-1 text-muted'>{card.date}</div>
                    <p className='card-text mb-auto' style={{ color: card.body && `rgba(${card.body.textColor.r}, ${card.body.textColor.g}, ${card.body.textColor.b}, ${card.body.textColor.a})`, backgroundColor: card.body && `rgba(${card.body.bgColor.r}, ${card.body.bgColor.g}, ${card.body.bgColor.b}, ${card.body.bgColor.a})` }}>
                      {card.body && card.body.text}
                    </p>
                    {card.body && card.body.link && <a href={card.body.link.href}>{card.body.link.text}</a>}
                  </div>
                  <div className='col-auto d-none d-lg-block'>
                    {card.image && <img src={card.image.src} alt={card.image.alt} />}
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Blog