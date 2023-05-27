import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const HireDeveloperForm = () => {

  return (
    <Container className='h-100 d-flex justify-content-center align-items-center'>
      <Row>
        <Col>
        
          <h1>Hire a Developer</h1>
          <p>Fill out the form below to get started.</p>

          <Form>
            <Form.Group controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
              />
            </Form.Group>

            <Form.Group controlId='formEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
              />
            </Form.Group>

            <Form.Group controlId='formPhone'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='tel'
                placeholder='Enter phone number'
              />
            </Form.Group>

            <Form.Group controlId='formProjectDescription'>
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter project description'
              />
            </Form.Group>

            <Button
              variant='dark'
              type='submit'
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default HireDeveloperForm
