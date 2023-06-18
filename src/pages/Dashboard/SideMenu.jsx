import { Accordion, Button, Card, Container, ListGroup } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import { CiMenuBurger } from 'react-icons/ci'
import { MdDashboard, MdDomain } from 'react-icons/md'
import { FaSignOutAlt, FaUser, FaProductHunt } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'

import './Dashboard.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import { CanvasContext } from '../../context/canvas.context'
import { useLocation, useNavigate } from 'react-router-dom'
import DraggableComponent from '../../components/DraggableComponent/DraggableComponent'
import { BiSupport } from 'react-icons/bi'
import { FaShopify } from 'react-icons/fa'

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

const SideMenu = ({ collapseSidemenu }) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const {
    storeComponents,
    fetchUserWebsites,
    fetchCommunityWebsites,
    fetchUserInfo,
    userPlan,
    fetchStoreItems,
    userInfo,
    setCollapseSidemenu,
    isMobile,
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
    <>
      <Container>
        {collapseSidemenu ? (
          <CiMenuBurger
            className='text-white mt-5'
            size={20}
            onClick={() => setCollapseSidemenu(false)}
          />
        ) : (
          <>
            {/* User login info/logout  */}
            <Card className='bg-dark text-white my-5 border-0'>
              {isMobile && (
                <Button
                  variant={'dark'}
                  className='text-white p-1 mb-2 ms-auto '
                  style={{ width: '22px', fontSize: '1.4rem' }}
                  onClick={() => setCollapseSidemenu(true)}
                >
                  X
                </Button>
              )}
              <Card.Header>
                <a
                  className={isMobile ? 'fs-5' : 'fs-1'}
                  href='/'
                >
                  {isMobile ? 'WB' : 'WEBUILD'}
                </a>
              </Card.Header>
              <Card.Body className='custom-user-info'>
                {isLoggedIn && (
                  <>
                    {userPlan && (
                      <Card.Text >
                        {isMobile ? <FaProductHunt size={20} className='mb-1'/> : 'Plan:'}
                        <a href='/dashboard#section4'> {userPlan.name}</a>
                      </Card.Text>
                    )}
                    <Card.Text className={isMobile ? 'my-3' : 'my-5'}>
                      {isMobile ? (
                        <FaUser size={20} className='mb-1'/>
                      ) : (
                        <span className='text-muted'>Signed in as </span>
                      )}
                      <a href='/dashboard#section3'> {userInfo?.name}</a>
                    </Card.Text>

                    <Button
                      className='px-3'
                      variant='dark'
                      onClick={logOutUser}
                    >
                      {isMobile ? <FaSignOutAlt /> : 'Log Out'}
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
                    <CustomToggle
                      eventKey='dashboard'
                      className=''
                    >
                      <a href='#section1'>
                        {isMobile ? <MdDashboard size={30} /> : 'Dashboard'}{' '}
                      </a>
                    </CustomToggle>
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
                          {isMobile ? <FaUser size={30} /> : 'User'}
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='user-settings'>
                        <ListGroup>
                          <ListGroup.Item className='custom-sidebar-links'>
                            <a href='#section3'> Settings </a>
                          </ListGroup.Item>
                          <ListGroup.Item className='custom-sidebar-links'>
                            <a href='#section4'> Plans</a>
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>

                    {/* support  */}
                    <Card className='bg-dark border-none'>
                      <Card.Header>
                        <CustomToggle eventKey='4'>
                          {isMobile ? <BiSupport size={30} /> : 'Support'}
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='4'>
                        <ListGroup>
                          <ListGroup.Item className='custom-sidebar-links'>
                            <a href='/support'>Help Forum </a>
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>

                    <Card className='bg-dark border-none'>
                      <Card.Header>
                        <CustomToggle eventKey='11'>
                          {isMobile ? <HiUserGroup size={30} /> : 'Community'}{' '}
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='11'>
                        <ListGroup>
                          <ListGroup.Item className='custom-sidebar-links'>
                            <a href='#section2'> Community websites </a>
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Collapse>
                    </Card>

                    {/* Link Costumization  */}
                    <Card className='bg-dark border-none'>
                      <Card.Header>
                        <CustomToggle eventKey='5'>
                          {isMobile ? <MdDomain size={30} /> : 'Customize URLs'}
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
                        <CustomToggle eventKey='6'>
                          {isMobile ? <FaShopify size={30} /> : 'My Products'}
                        </CustomToggle>
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
        )}
      </Container>
    </>
  )
}

export default SideMenu
