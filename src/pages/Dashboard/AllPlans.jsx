import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import canvasStoreService from '../../services/canvas-store.service'
import Button from 'react-bootstrap/Button';

function AllPlans() {
  const { webSites, fetchAllWebsites } = useContext(CanvasContext)
  const [allPlans, setAllPlans] = useState()

  useEffect(() => {
    canvasStoreService.getAllPlans().then(response => {
      setAllPlans(response.data)
    })
  }, [])

  // Later Add all the graphs and stats of all the websitres the user has created already

  return (
    <>
      <h1>Upgrade Plans</h1>

      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Upgrade Your Features</Card.Title>
            <Card.Text>
              Choose a plan that fulfills your desires
            </Card.Text>
            <Card.Link href='/websites'>Start now!</Card.Link>
          </Card.Body>
        </Card>

        <Row>
          {allPlans && allPlans.length > 0 &&
            allPlans.map((element) => {
              return (
                <Col
                  md={3}
                  key={element._id}
                >
                  <Card>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      {element.category}
                    </Card.Subtitle>

                    <Card.Body style={{ width: '100%', height: '100%' }}>
                    <ListGroup variant="flush">
                    <ListGroup.Item>   {element.duration}  </ListGroup.Item>
                    <ListGroup.Item>    {element.price} € </ListGroup.Item>
                  
                    <ListGroup.Item   as="li" active>   Features </ListGroup.Item>

                        {element.features.map(element => {
                          return (
                            <ListGroup.Item>     {element}     </ListGroup.Item>
                          )
                        })

                        }
                      </ListGroup>
                      <Link to={`/upgrade/${element._id}`}>
                        
                      <Button variant="outline-success">  Select Plan </Button>

                      </Link>

                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
        </Row>
      </Container>
    </>
  )
}

export default AllPlans
