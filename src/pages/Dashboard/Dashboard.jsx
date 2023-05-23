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
import UserSettings from './UserSettings'
import AllPlans from './AllPlans'
import CreateForm from '../Create/CreateForm'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const {
    userWebsites,
    fetchUserWebsites,
    communityWebsites,
    fetchCommunityWebsites,
    getStatistics,
    userInfo,
    clickedWebsite,
    setClickedWebsite,
  } = useContext(CanvasContext)

  const [id, setId] = useState(null)
  const [skip, setSkip] = useState(false)

  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    fetchUserWebsites(user._id)
    fetchCommunityWebsites()
  }, [])

  const viewStatistics = async (websiteId) => {
    setId(websiteId)
    setSkip(true)
    setClickedWebsite(userWebsites.find((website) => website._id === id))
    console.log(clickedWebsite)
    setClickedWebsite(userWebsites.find((website) => website._id === websiteId))
  }

  return (
    <>
      <div className='dashboard'>
        <Container>
          <h2 className='display-4 section-title'>My Websites</h2>

          {/* Renders  */}
          <Row className='dashboard-row'>
            <Col md={6}>
              <CreateForm />
            </Col>
            <Col
              md={6}
              className=''
            >
              <Card className='dashboard-card support-container'>
                <Row>
                  <Card.Text className='fs-2 fw-bold support-header'>
                    Need Help?
                  </Card.Text>
                </Row>
                <Row className='support-cards'>
                  <Col
                    onClick={() => navigate('/support')}
                    className='support-card'
                  >
                    <Card.Link className='fs-5'>Talk to Support</Card.Link>
                    <img
                      src='./support.png'
                      alt='support-icon'
                      className='mt-2 get-support-icon'
                    />
                  </Col>
                  <Col
                    onClick={() => navigate('/hire-a-dev')}
                    className='support-card'
                  >
                    <Card.Link className='fs-5'>
                      Hire a Professional Designer
                    </Card.Link>
                    <img
                      src='./programmer.png'
                      alt='hire-dev'
                      className='mt-2 get-support-icon'
                    />
                  </Col>
                </Row>
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
            <Card
              body
              className='py-1 dashboard-card'
            >
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
                  {communityWebsites &&
                    communityWebsites.length > 0 &&
                    communityWebsites.map((website) => {
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
            </Card>
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
