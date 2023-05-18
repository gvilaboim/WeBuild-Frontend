import { useContext } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { CanvasContext } from '../../context/canvas.context'

const Footer = ({ component }) => {
  const { website, publicView } = useContext(CanvasContext)

  const year = new Date().getFullYear()

  return (
    <Container>
      <Row className='border-top py-5 my-5 '>
        <Col mb={3}>
          <a
            href={publicView ? '/' : '#'}
            className='d-flex align-items-center mb-3 link-body-emphasis text-decoration-none'
          >
            <p>{website.name}</p>
          </a>
          <p className='text-body-secondary'>&copy; {year}</p>
        </Col>

        <Col mb={3}></Col>

        {component.items.length > 0 &&
          component.items.map((item, index) => {
            return (
              <>
                <Col key={index} mb={3}>
                  <h5>{item.header.text}</h5>
                  <Nav className='flex-column'>
                    <Nav.Item className='mb-2'>
                      {item.links.map((link, linkIndex) => (
                        <Nav.Link
                        key={linkIndex}
                          href={link.href}
                          className='nav-link p-0 text-body-secondary'
                        >
                          {link.text}
                        </Nav.Link>
                      ))}
                    </Nav.Item>
                  </Nav>
                </Col>
              </>
            )
          })}
      </Row>
    </Container>
  )
}

export default Footer
