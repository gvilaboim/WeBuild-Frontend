import './Dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Col, Table } from 'react-bootstrap'

import { AuthContext } from '../../context/auth.context'

import Statistics from './Statistics'
import UserSettings from './UserSettings'
import AllPlans from './AllPlans'
import CreateForm from '../Create/CreateForm'
import { useNavigate } from 'react-router-dom'

import { GrView } from 'react-icons/gr'

function Dashboard() {
  const {
    isMobile,
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

  const navigate = useNavigate()

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
          <h2
            className='display-4 section-title'
            id='section1'
          >
            My Websites
          </h2>

          <Row className='dashboard-row'>
            <Col
              md={6}
              className={isMobile && 'mb-4'}
            >
              <CreateForm />
            </Col>
            <Col md={6}>
              <Card className='dashboard-card support-container'>
                <Row>
                  <Card.Text className='fs-2 fw-bold support-header'>
                    Need Help?
                  </Card.Text>
                </Row>
                <Row className='support-cards'>
                  <Col
                    sm={12}
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
                    sm={12}
                    onClick={() => navigate('/hire-a-dev')}
                    className='support-card'
                  >
                    <Card.Link className='fs-5 '>
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
              <Col lg={9}>
                <Card className='my-websites-table mb-4'>
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
                                <td className='text-center'>
                                  <a
                                    href={`/webuild/${website.user.name}/${website.name}/${website._id}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    <GrView
                                      className='view-button'
                                      size={30}
                                    />
                                  </a>
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
                lg={3}
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

          <h2
            className='display-4 section-title'
            id='section2'
          >
            Community Websites
          </h2>
          <Row className='mx-1'>
            <Card
              body
              className='py-1 dashboard-card'
              style={{ textAlign: 'left' }}
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
                    <th>Views</th>
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
                          <td>{website.visitors.length}</td>
                          <td>
                            <a
                              href={`/webuild/${website.user.name}/${website.name}/${website._id}`}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <GrView className='view-button' />
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
            </Card>
          </Row>

          <div className='section-border'></div>

          <h2
            className='display-4 section-title'
            id='section3'
          >
            User Settings
          </h2>
          <Row className='user-settings-container'>
            <UserSettings />
          </Row>

          <div className='section-border'></div>

          <h2
            className='display-4 section-title'
            id='section4'
          >
            Upgrade
          </h2>
          <AllPlans />
        </Container>
      </div>
    </>
  )
}

export default Dashboard
