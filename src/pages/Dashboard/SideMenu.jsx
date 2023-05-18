import { Accordion, ListGroup } from 'react-bootstrap'
import './Dashboard.css'

function SideMenu({ userWebsites, communityWebsites }) {
  return (
    <div className='dashboard-sidemenu'>
      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>My Websites</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {userWebsites &&
                userWebsites.length > 0 &&
                userWebsites.map((website) => {
                  return (
                    <ListGroup.Item
                      key={website._id}
                      action
                    >
                      {website.name}
                    </ListGroup.Item>
                  )
                })}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Community Websites</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {communityWebsites &&
                communityWebsites.length > 0 &&
                communityWebsites.map((website) => {
                  return (
                    <ListGroup.Item
                      key={website._id}
                      action
                    >
                      {website.name}
                    </ListGroup.Item>
                  )
                })}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default SideMenu
