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
  const { userPlan } = useContext(CanvasContext)
  const [allPlans, setAllPlans] = useState()

  useEffect(() => {
    canvasStoreService.getAllPlans().then((response) => {
      setAllPlans(response.data)
    })
  }, [])

  return (
    <>
      <Card className='bg-transparent border-0'>
        <Card.Body>
          <Row>
            {userPlan && allPlans &&
              allPlans.length > 0 &&
              allPlans.map((plan) => {
                return (
                  <Col
                    md={4}
                    key={plan._id}s
                  >
                    <Card
                      className={
                        userPlan.name === plan.name
                          ? 'p-3 dashboard-card border-dark'
                          : 'p-3 dashboard-card'
                      }
                    >
                      <Card.Title className='text-uppercase'>{plan.name}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {plan.category}
                      </Card.Subtitle>

                      <Card.Body style={{ width: '100%', height: '100%' }}>
                        <ListGroup variant='flush'>
                          <ListGroup.Item> {plan.duration} </ListGroup.Item>
                          <ListGroup.Item> {plan.price} € </ListGroup.Item>

                          <ListGroup.Item
                            className='bg-dark text-white'
                            as='li'
                          >
                            Features
                          </ListGroup.Item>

                          {plan.features.map((feature) => {
                            return <ListGroup.Item> {feature} </ListGroup.Item>
                          })}
                        </ListGroup>
                        <Link to={`/upgrade/${plan._id}`}>
                          {userPlan.name === plan.name ? (
                            <Button variant='dark'>Current Plan</Button>
                          ) : (
                            <Button variant='outline-dark'>Select Plan</Button>
                          )}
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
