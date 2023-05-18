import './Dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../../context/auth.context'
import SideMenu from './SideMenu'
import { Col } from 'react-bootstrap'

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

  // const viewStatistics = async (id) => {
  //   setId(id)
  //   setSkip(true)
  // }

  return (
    <>
      <div className='dashboard'>
        <SideMenu
          userWebsites={userWebsites}
          communityWebsites={communityWebsites}
        />

        <Container>
          <Card className='m-3'>
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
            <Col>
              <h1>Stats</h1>

              {/* <Statistics
                getStatistics={getStatistics}
                id={id}
              /> */}
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
    </>
  )
}

export default Dashboard
