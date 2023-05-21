import './Dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../../context/auth.context'
import { Col, Table } from 'react-bootstrap'
import Statistics from './Statistics'
import WebsiteDetails from './WebsiteDetails'
import LastUpdatedWebsites from './LastUpdatedWebsites'

import UserSettings from './UserSettings'

import AllPlans from './AllPlans'
import CreateForm from '../Create/CreateForm'

function Dashboard() {
  const {
    userWebsites,
    fetchUserWebsites,
    communityWebsites,
    fetchCommunityWebsites,
    getStatistics,
    clickedWebsite,
    setClickedWebsite,
  } = useContext(CanvasContext)

  const [id, setId] = useState(null)
  const [skip, setSkip] = useState(false)

  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchUserWebsites(user._id)
    fetchCommunityWebsites()
  }, [])

  const viewStatistics = async (websiteId) => {
    setId(websiteId)
    setSkip(true)
    setClickedWebsite(userWebsites.find((website) => website._id === websiteId))
  }

  return (
    <>
      <div className='dashboard'>
        <Container>
          <h2 className='display-4 section-title'>My Websites</h2>

          {/* Not needed here if the user has no websites - will be show up top  */}

          <Row className='dashboard-row'>
            <Col md={6}>
              <CreateForm />
            </Col>
            <Col
              md={6}
              className=''
            >
              <Card className='dashboard-card'>
                <Card.Body className='d-flex flex-column justify-content-center fs-lg'>
                  <Card.Text>Need Help?</Card.Text>
                  <Card.Link href='/support'>Talk to Support</Card.Link>
                  <Card.Text>Or</Card.Text>
                  <Card.Link href='/hire-a-dev'>
                    Hire a Professional Designer
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {userWebsites && userWebsites.length > 0 && (
            <Row className='my-websites-row dashboard-row'>
              <Col md={6}>
                <Card className='my-websites-table'>
                  <Card.Body>
                    <Table
                      variant='light'
                      responsive='md'
                      striped
                      hover
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Created at</th>
                          <th>Last updated</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userWebsites &&
                          userWebsites.length > 0 &&
                          userWebsites.map((website) => {
                            const createdAt = new Date(website.createdAt)
                            const updatedAt = new Date(website.updatedAt)

                            return (
                              <tr
                                key={website._id}
                                onClick={() => viewStatistics(website._id)}
                              >
                                <td>{website.name}</td>
                                <td>
                                  {website.category.length > 10
                                    ? website.category.slice(0, 10) + '...'
                                    : website.category}
                                </td>
                                <td>
                                  {createdAt
                                    .toLocaleString()
                                    .slice(
                                      0,
                                      createdAt.toLocaleString().indexOf(',')
                                    )}
                                </td>
                                <td>
                                  {updatedAt
                                    .toLocaleString()
                                    .slice(
                                      0,
                                      updatedAt.toLocaleString().indexOf(',')
                                    )}
                                </td>
                                <td>
                                  <Button
                                    variant='secondary'
                                    href={`/webuild/${website.user.name}/${website.name}/${website._id}`}
                                  >
                                    View
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    variant='dark'
                                    href={`/websites/edit/${website._id}`}
                                  >
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                md={6}
                className='my-websites-stats'
              >
                {clickedWebsite ? (
                  <Statistics
                    getStatistics={getStatistics}
                    id={clickedWebsite._id}
                  />
                ) : (
                  <>
                    <Card className='stats-card'>
                      <Card.Body>
                        <Table
                          striped
                          bordered
                          hover
                        >
                          <thead>
                            <tr>
                              <th>Country</th>
                              <th>Views</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>No website Selected</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </>
                )}
              </Col>
            </Row>
          )}

          <div className='section-border'></div>

          <h2 className='display-4 section-title'>Community Websites</h2>
          <Row>
            {communityWebsites &&
              communityWebsites.length > 0 &&
              communityWebsites.map((website) => {
                return (
                  <Col
                    md={6}
                    key={website._id}
                  >
                    <WebsiteDetails website={website} />
                  </Col>
                )
              })}
          </Row>

          <div className='section-border'></div>

          <h2 className='display-4 section-title'>User Settings</h2>
          <Row className='user-settings-container'>
            <UserSettings />
          </Row>

          <div className='section-border'></div>

          <h2 className='display-4 section-title'>Upgrade</h2>
          <AllPlans />
          
        </Container>
      </div>
    </>
  )
}

export default Dashboard
