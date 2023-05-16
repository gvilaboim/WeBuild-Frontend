import { Link } from 'react-router-dom'
import './Dashboard.css'
import { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


function Statistics() {
  const { webSites, fetchAllWebsites   } = useContext(CanvasContext)


  
  useEffect(() => {
    fetchAllWebsites()

 
  }, [])


  return (
    <>
    <div> 
     
    
      <Container>
      
      <Card>
        <Card.Body>
          <Card.Title> <h1>Statistics</h1></Card.Title>
          <Card.Text>
            Use your Imagination and our tools to create the page of your dreams
          </Card.Text>
          <Card.Link href='/websites'>Start now!</Card.Link>
        </Card.Body>
      </Card>

        <Row>
          
        </Row>
      </Container>
      </div>
    </>
  )
}

export default Statistics
