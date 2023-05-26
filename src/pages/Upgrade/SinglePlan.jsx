import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import canvasStoreService from '../../services/canvas-store.service'
import { AuthContext } from '../../context/auth.context'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import Loading from '../../components/Loading/Loading'
import { CanvasContext } from '../../context/canvas.context'

function SinglePlan() {
  const { user } = useContext(AuthContext)
  const { userPlan } = useContext(CanvasContext)

  const [plan, setPlan] = useState()
  const { id } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    canvasStoreService.checkout(plan, user._id).then((res) => {
      const { url } = res.data
      if(plan.name === "Basic") 
      {
        window.location.href =  "/success"
      }else {
        window.location.href = url

      }
    })
  }

  useEffect(() => {
    canvasStoreService.getSinglePlan(id).then((response) => {
      setPlan(response.data)
    })
  }, [id])

  return (
    <>
      <Container>
        {plan && (
          <>
            <h1 className='py-3 mt-5'>{plan.name}</h1>
            <Row className='mt-5'>
              <h4 className='pb-5'>
                Create, publish and edit your website with ease using our{' '}
                {plan.name}.
              </h4>
              <Col
                lg={8}
                className='mb-3 '
              >
                <Card
                  body
                  className='text-left fs-5 dashboard-card'
                >
                  {plan &&
                    plan.features &&
                    plan.features.length > 0 &&
                    plan.features.map((feature) => (
                      <p className='border-0'>{feature}</p>
                    ))}
                </Card>
              </Col>
              <Col
                lg={4}
                className='dashboard-card mb-3 bg-white d-flex justify-content-center align-items-center rounded'
              >
                <Card className='text-center border-0'>
                  <Card.Body className='d-flex flex-column justify-content-evenly align-items-center'>
                    <h2>${plan.text}/month</h2>
                    {userPlan?.name === plan.name ? (
                      <Button variant='light'>This is your current plan</Button>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <Button
                          type='submit'
                          variant='dark'
                        >
                          Buy Plan
                        </Button>
                      </form>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
        {!plan && <Loading />}
      </Container>
      {/* <Container>
        {plan && (
          <>
            <Row className='mt-5'>
              <h1 className='section-title'>{plan.name}</h1>
            </Row>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>Upgrade Your Features</Card.Title>
                    <Card.Text>
                      Choose a plan that fulfills your desires
                    </Card.Text>
                    <Card.Link href='/websites'>Start now!</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
              <form onSubmit={handleSubmit}>
                <button type='submit'>Checkout</button>
              </form>
            </Row>
          </>
        )} 

      </Container>*/}
    </>
  )
}

export default SinglePlan
