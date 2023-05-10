import { useContext } from 'react'
import { Container, Row, Col, Nav, Button } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'

const Footer = ({ component }) => {
  const { websiteInfo, isSiteLive } = useContext(CanvasContext)
  return (
    <Container>
      <Row className='border-top py-5 my-5 '>
        <Col mb={3}>
          <a
            href={isSiteLive ? '/' : '#'}
            className='d-flex align-items-center mb-3 link-body-emphasis text-decoration-none'
          >
            <p>{websiteInfo.name}</p>
          </a>
          <p className='text-body-secondary'>&copy; 2023</p>
        </Col>

        <Col mb={3}></Col>

        <Col mb={3}>
          <h5>Section</h5>
          <Nav className='flex-column'>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Features
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Pricing
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                FAQs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                About
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col mb={3}>
          <h5>Section</h5>
          <Nav className='flex-column'>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Features
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Pricing
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                FAQs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                About
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col mb={3}>
          <h5>Section</h5>
          <Nav className='flex-column'>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Features
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                Pricing
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                FAQs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='mb-2'>
              <Nav.Link
                href='#'
                className='nav-link p-0 text-body-secondary'
              >
                About
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
