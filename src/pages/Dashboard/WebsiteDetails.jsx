import React, { useEffect } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const WebsiteDetails = ({ website }) => {
  const createdAt = new Date(website.createdAt)
  const updatedAt = new Date(website.updatedAt)
  const navigate = useNavigate();

  useEffect(() => {
   console.log(website.user.name)
  }, [website])
  
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
                  <ListGroup.Item>
                  <Link to={ `/webuild/${website.user.name}/${website.name}/${website._id}`} variant='dark'  >
            Go to Website
          </Link>
          </ListGroup.Item>
          <ListGroup.Item>
          <Link to={ `/websites/edit/${website._id}`} variant='dark'  >
           Edit Website
          </Link>
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
