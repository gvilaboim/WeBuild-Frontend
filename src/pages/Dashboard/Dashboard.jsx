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
import Statistics from './Statistics'
import WebsiteDetails from './WebsiteDetails'
import LastUpdatedWebsites from './LastUpdatedWebsites'

import UserSettings from './UserSettings'

import AllPlans from './AllPlans'


function Dashboard() {
  const {
    userWebsites,
    fetchUserWebsites,
    communityWebsites,
    fetchCommunityWebsites,
    getStatistics,
    userInfo
  } = useContext(CanvasContext)

  const { user } = useContext(AuthContext)
  const [id, setId] = useState(0)
  const [skip, setSkip] = useState(false)
  const [clickedWebsite, setClickedWebsite] = useState(null)

  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchUserWebsites(user._id)
    fetchCommunityWebsites()
  }, [])

  const viewStatistics = async (id) => {
    setId(id)
    setSkip(true)
    setClickedWebsite(userWebsites.find((website) => website._id === id))
    console.log(clickedWebsite)
  }

  return (
    <>
      <div className='dashboard'>
        <SideMenu
          userWebsites={userWebsites}
          communityWebsites={communityWebsites}
          viewStatistics={viewStatistics}
          setPage={setPage}
        />

        {page == 1 ? (

          <Container>
            <Row>
              <Col>
                <Card className='my-3'>
                  <Card.Body>
                    <Card.Title>Create a Website</Card.Title>
                    <Card.Text>
                      Use your Imagination and our tools to create the page of
                      your dreams
                    </Card.Text>
                    <Button href='/websites'>Start now!</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>

                {clickedWebsite ? (
                  <>
                    <WebsiteDetails website={clickedWebsite} />
                    <h1>Stats</h1>

                    <Statistics
                      getStatistics={getStatistics}
                      id={id}
                    />
                  </>
                ) : (
                  <>
                    <LastUpdatedWebsites
                      communityWebsites={communityWebsites}
                    />
                  </>
                )}
              </Col>
            </Row>
            <Row></Row>
          </Container>

        ) : <></>
        }
        {page == 2 ? (
          <UserSettings />
        ) : <></>
        }


        {page == 3 ? (
          <AllPlans/>
          
          ) : <></>
        }

  


      </div>
    </>
  )
}

export default Dashboard
