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
        <Card
          md={3}
          style={{ height: '250px' }}
          className='my-3 dashboard-card'
        >
          <Card.Body>
            <Card.Title>{website.name}</Card.Title>
            <Card.Subtitle className='text-muted'>
              {website.category.length > 10
                ? website.category.slice(0, 10) + '...'
                : website.category}
            </Card.Subtitle>
            <Card.Text>{website.description}</Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>
              <span className='fw-bold'>Created on: </span>
              {createdAt.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className='fw-bold'>Last Updated: </span>
              {updatedAt.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item className='d-flex justify-content-evenly'>
              <Button
                className='px-4'
                variant='secondary'
                href={`/webuild/${website.user.name}/${website.name}/${website._id}`}
              >
                View
              </Button>
              {/* <Button
                className='px-4'
                variant='dark'
                href={`/websites/edit/${website._id}`}
              >
                Edit
              </Button> */}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </>
  )
}

export default WebsiteDetails
