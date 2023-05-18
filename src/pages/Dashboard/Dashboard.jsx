import { Link } from 'react-router-dom'
import './Dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Statistics from './Statistics'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../../context/auth.context'

function Dashboard() {
  const {
    userWebsites,
    fetchUserWebsites,
    communityWebsites,
    fetchCommunityWebsites,
    getStatistics,
  } = useContext(CanvasContext)

  const { user } = useContext(AuthContext)
  const [id, setId] = useState(0)
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    fetchUserWebsites(user._id)
    fetchCommunityWebsites()
  }, [])

  const viewStatistics = async (id) => {
    setId(id)
    setSkip(true)
  }



  return (
    <>
      <div>
        <h1>Websites</h1>

        <Container>
          <Card className='mb-3 w-25'>
            <Card.Body>
              <Card.Title>Create a Website</Card.Title>
              <Card.Text>
                Use your Imagination and our tools to create the page of your
                dreams
              </Card.Text>
              <Button href='/websites'>Start now!</Button>
            </Card.Body>
          </Card>

          <Row>
            <Col md={3}>
              <h1>My Websites</h1>
              {userWebsites &&
                userWebsites.length > 0 &&
                userWebsites.map((website) => {
                  return (
                    <Card key={website._id}>
                      <Card.Title>{website.name}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {website.category}
                      </Card.Subtitle>
                      <Button onClick={() => viewStatistics(website._id)}>
                        Insights
                      </Button>
                      <Card.Body style={{ width: '100%', height: '100%' }}>
                        <Link to={`/websites/edit/${website._id}`}>Visit</Link>
                      </Card.Body>
                    </Card>
                  )
                })}
            </Col>
            <Col>
              <h1>Stats</h1>

              <Statistics
                getStatistics={getStatistics}
                id={id}
              />
            </Col>
          </Row>
          <Row>
            <h1>Community Websites</h1>
            {communityWebsites &&
              communityWebsites.length > 0 &&
              communityWebsites.map((website) => {
                return (
                  <Col md={3}>
                    <Card key={website._id}>
                      <Card.Title>{website.name}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {website.category}
                      </Card.Subtitle>

                      <Card.Body style={{ width: '100%', height: '100%' }}>
                        <Link
                          to={`/webuild/${website.user.name}/${website.name}/${website._id}`}
                        >
                          Visit
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Dashboard
