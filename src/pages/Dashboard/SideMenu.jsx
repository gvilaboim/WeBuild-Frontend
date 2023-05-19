import { Accordion, Button, Card, Container } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

import './Dashboard.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {})

  return (
    <Button
      type='button'
      className='custom-toggle-button'
      onClick={decoratedOnClick}
    >
      <>{children}</>
    </Button>
  )
}

function SideMenu({ userWebsites, communityWebsites, viewStatistics }) {
  return (
    <div className='dashboard-sidemenu'>
      <Container >
        <Accordion>
          <Card className='bg-dark border-none'>
            <Card.Header>
              <CustomToggle eventKey='0'>My Websites</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <>
                {userWebsites &&
                  userWebsites.length > 0 &&
                  userWebsites.map((website) => {
                    return (
                      <Card.Body
                        className='custom-sidebar-links'
                        key={website._id}
                      >
                        {/* <a href={`/websites/edit/${website._id}`}>{website.name}</a> */}
                        <div onClick={() => viewStatistics(website._id)}>
                          {website.name}
                        </div>
                      </Card.Body>
                    )
                  })}
              </>
            </Accordion.Collapse>
          </Card>

          <Card className='bg-dark border-none'>
            <Card.Header>
              <CustomToggle eventKey='1'>Community Pages</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey='1'>
              <>
                {communityWebsites &&
                  communityWebsites.length > 0 &&
                  communityWebsites.map((website) => {
                    return (
                      <Card.Body
                        className='custom-sidebar-links'
                        key={website._id}
                      >
                        <a
                          href={`/webuild/${website.user.name}/${website.name}/${website._id}`}
                        >
                          {website.name}
                        </a>
                      </Card.Body>
                    )
                  })}
              </>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    </div>
  )
}

export default SideMenu
