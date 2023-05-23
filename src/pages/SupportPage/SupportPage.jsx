import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const SupportPage = () => {
    
  return (
    <Container>
      <h1 className='display-5 pb-0 section-title'>Support</h1>

      <div className='section-border'></div>

      <Row className='py-4'>
        <Col className='p-5'>
          <p className='fs-4 lead'>
            Welcome to our support page. Here you can find answers to common
            questions and get help with any issues you're experiencing.
          </p>
        </Col>
      </Row>

      <Row>
      <Col md={6} className='pb-3 px-5'>
        <h2 className='mb-4'>Frequently Asked Questions</h2>
        <ListGroup>
          <ListGroup.Item>How do I create a new website?</ListGroup.Item>
          <ListGroup.Item>How do I edit an existing website?</ListGroup.Item>
          <ListGroup.Item>How do I delete a website?</ListGroup.Item>
          <ListGroup.Item>What payment methods do you accept?</ListGroup.Item>
          <ListGroup.Item>How do I contact customer support?</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={6} className='pb-0 px-5'>
        <h2 className='m-0'>Contact Us</h2>
        <p className='pb-3'>
          If you need further assistance, please don't hesitate to reach out to
          our customer support team. You can contact us through the following
          channels:
        </p>
        <ListGroup className='list-unstyled'>
          <ListGroup.Item>
            <i className='bi bi-telephone me-2'></i>Phone: 1-800-123-4567
          </ListGroup.Item>
          <ListGroup.Item>
            <i className='bi bi-envelope me-2'></i>Email: support@mywebsite.com
          </ListGroup.Item>
          <ListGroup.Item>
            <i className='bi bi-chat-left me-2'></i>Live Chat: Click on the chat
            icon in the bottom right corner of the screen
          </ListGroup.Item>
        </ListGroup>
      </Col>
      </Row>
    </Container>
  )
}

export default SupportPage
