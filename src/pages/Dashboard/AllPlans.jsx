import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import ListGroup from 'react-bootstrap/ListGroup'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import canvasStoreService from '../../services/canvas-store.service'
import Button from 'react-bootstrap/Button'

function AllPlans() {
  const { webSites, fetchAllWebsites } = useContext(CanvasContext)
  const [allPlans, setAllPlans] = useState()

  useEffect(() => {
    canvasStoreService.getAllPlans().then((response) => {
      setAllPlans(response.data)
    })
  }, [])


  return (
    <>
      <Card className='p-2 bg-transparent border-0'>
        {/* <Card.Link href='/websites'>Start now!</Card.Link> */}
        <Card.Body>
          <Row>
            {allPlans &&
              allPlans.length > 0 &&
              allPlans.map((element) => {
                return (
                  <Col
                    md={4}
                    key={element._id}
                  >
                    <Card className='p-3'>
                      <Card.Title>{element.name}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {element.category}
                      </Card.Subtitle>

                      <Card.Body style={{ width: '100%', height: '100%' }}>
                        <ListGroup variant='flush'>
                          <ListGroup.Item> {element.duration} </ListGroup.Item>
                          <ListGroup.Item> {element.price} € </ListGroup.Item>

                          <ListGroup.Item
                            className='bg-dark text-white'
                            as='li'
                          >
                            Features
                          </ListGroup.Item>

                          {element.features.map((element) => {
                            return <ListGroup.Item> {element} </ListGroup.Item>
                          })}
                        </ListGroup>
                        <Link to={`/upgrade/${element._id}`}>
                          <Button variant='outline-dark'>Select Plan</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default AllPlans
