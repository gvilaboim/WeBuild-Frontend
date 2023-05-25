import { Accordion, Button, Card, Container, ListGroup } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'

import './Dashboard.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import { CanvasContext } from '../../context/canvas.context'
import { useLocation, useNavigate } from 'react-router-dom'
import DraggableComponent from '../../components/DraggableComponent/DraggableComponent'

const CustomToggle = ({ children, eventKey }) => {
  const navigate = useNavigate()
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    if (eventKey === 'dashboard') navigate('/dashboard')
  })

  return (
    <Button
      variant='dark'
      type='button'
      className='custom-toggle-button'
      onClick={decoratedOnClick}
    >
      <>{children}</>
    </Button>
  )
}

const SideMenu = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const {
    storeComponents,
    fetchUserWebsites,
    fetchCommunityWebsites,
    fetchUserInfo,
    userPlan,
    fetchStoreItems,
    planFeature,
    website,
    publicView,
  } = useContext(CanvasContext)

  const location = useLocation()
  useEffect(() => {
    if (user) {
      fetchUserInfo(user._id)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchUserWebsites(user._id)
    }
    fetchCommunityWebsites()
    fetchStoreItems()
  }, [])

  return (
    <div>
      <Container>
        <>
          {/* User login info/logout  */}
          <Card className='bg-dark text-white my-5 border-0'>
            <Card.Header>
              <a
                className='display-5'
                href='/'
              >
                WEBUILD
              </a>
            </Card.Header>
            <Card.Body className='custom-user-info'>
              {!isLoggedIn && (
                <div className='d-flex flex-column '>
                  <Button
                    variant='secondary'
                    href='/signup'
                  >
                    Signup
                  </Button>
                  <Button
                    variant='secondary'
                    href='/login'
                  >
                    Login
                  </Button>
                  <Button
                    variant='light'
                    href='/premium'
                  >
                    Upgrade
                  </Button>
                </div>
              )}
              {isLoggedIn && (
                <>
                  {userPlan && (
                    <Card.Text>
                      Plan: <a href='/account'>{userPlan.name}</a>
                    </Card.Text>
                  )}
                  <Card.Text className='my-5'>
                    <span className='text-muted'>Signed in as </span>
                    <a href='/account'>{user.name}</a>
                  </Card.Text>

                  <Button
                    className='px-5'
                    variant='dark'
                    onClick={logOutUser}
                  >
                    Log Out
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
          {isLoggedIn && (
            <Accordion>
              {/* Dashboard */}
              <Card
                className={
                  location.pathname.startsWith('/websites/edit')
                    ? 'bg-secondary border-secondary'
                    : 'bg-dark border-none'
                }
              >
                <Card.Header>
                  <CustomToggle eventKey='dashboard'>Dashboard</CustomToggle>
                </Card.Header>
              </Card>

              {location.pathname.startsWith('/websites/edit') &&
                storeComponents.length > 0 && (
                  <>
                    {/* Navbar Widgets  */}
                    <Card className='bg-dark mt-5 border-none '>
                      <Card.Header>
                        <CustomToggle eventKey='navbar-widgets'>
                          Headers
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='navbar-widgets'>
                        <ListGroup>
                          {storeComponents.map(
                            (component) =>
                              component.type === 'navbar' && (
                                <ListGroup.Item className='custom-sidebar-links'>
                                  <DraggableComponent
                                    key={component._id}
                                    component={component}
                                  />
                                </ListGroup.Item>
                              )
                          )}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                    {/* Body Widgets  */}
                    <Card className='bg-dark border-none'>
                      <Card.Header>
                        <CustomToggle eventKey='content-widgets'>
                          Content
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='content-widgets'>
                        <ListGroup>
                          {storeComponents.map(
                            (component) =>
                              component.type === 'body' && (
                                <ListGroup.Item className='custom-sidebar-links'>
                                  <DraggableComponent
                                    key={component._id}
                                    component={component}
                                  />
                                </ListGroup.Item>
                              )
                          )}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                    {/* Footer Widgets  */}
                    <Card className='bg-dark border-none'>
                      <Card.Header>
                        <CustomToggle eventKey='footer-widgets'>
                          Footers
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='footer-widgets'>
                        <ListGroup>
                          {storeComponents.map(
                            (component) =>
                              component.type === 'footer' && (
                                <ListGroup.Item className='custom-sidebar-links'>
                                  <DraggableComponent
                                    key={component._id}
                                    component={component}
                                  />
                                </ListGroup.Item>
                              )
                          )}
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>
                  </>
                )}

              {!location.pathname.startsWith('/websites/edit') && (
                <>
                  {/* user settings  */}
                  <Card className='bg-dark border-none'>
                    <Card.Header>
                      <CustomToggle eventKey='user-settings'>
                        User{' '}
                      </CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='user-settings'>
                      <ListGroup>
                        <ListGroup.Item className='custom-sidebar-links'>
                          Settings
                        </ListGroup.Item>
                        <ListGroup.Item className='custom-sidebar-links'>
                          Plans
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Collapse>
                  </Card>

                  {/* support  */}
                  <Card className='bg-dark border-none'>
                    <Card.Header>
                      <CustomToggle eventKey='4'>Support </CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='4'>
                      <ListGroup>
                        <ListGroup.Item className='custom-sidebar-links'>
                          Help Forum
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Collapse>
                  </Card>

                  {/* Link Costumization  */}
                  <Card className='bg-dark border-none'>
                    <Card.Header>
                      <CustomToggle eventKey='5'>
                        Link Costumization{' '}
                      </CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='5'>
                      <ListGroup>
                        <ListGroup.Item className='custom-sidebar-links'>
                          Change Link
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Collapse>
                  </Card>

                  {/* Products  */}
                  <Card className='bg-dark border-none'>
                    <Card.Header>
                      <CustomToggle eventKey='6'>My Products</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='6'>
                      <ListGroup>
                        <ListGroup.Item className='custom-sidebar-links'>
                          See Products
                        </ListGroup.Item>
                        <ListGroup.Item className='custom-sidebar-links'>
                          Add New Product
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Collapse>
                  </Card>
                </>
              )}
            </Accordion>
          )}
        </>
      </Container>
    </div>
  )
}

export default SideMenu
