import React, { useEffect } from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'

const WebsiteDetails = ({ website }) => {
  const createdAt = new Date(website.createdAt)
  const updatedAt = new Date(website.updatedAt)

  return (
    <>
      {website && (
        <Container>
          <Row>
            <Col>
              <Card style={{ height: '250px' }}>
                <Card.Body>
                  <Card.Title>{website.name}</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    {website.category}
                  </Card.Subtitle>
                  <Card.Text>{website.description}</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  <ListGroup.Item>
                    Created on: {createdAt.toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Last Updated: {updatedAt.toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Is Published: {website.isPublished ? 'Yes' : 'No'}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default WebsiteDetails
