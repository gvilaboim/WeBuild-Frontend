import { Link } from 'react-router-dom'
import './Dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Statistics from './Statistics'
import Button from 'react-bootstrap/Button'


function Dashboard() {
  const { webSites, fetchAllWebsites ,GetStatistics} = useContext(CanvasContext)
  const [id, setId] = useState(0)

  const [skip, setSkip] = useState(false)
  useEffect(() => {
    fetchAllWebsites()
  }, [])


  const ViewtStatistics = async (id) =>{
    setId(id)
    setSkip(true)
  }


  return (
    <>
    <div> 
      <h1>Websites</h1>
    
      <Container>
      
      <Card>
        <Card.Body>
          <Card.Title>Create a Website</Card.Title>
          <Card.Text>
            Use your Imagination and our tools to create the page of your dreams
          </Card.Text>
          <Card.Link href='/websites'>Start now!</Card.Link>
        </Card.Body>
      </Card>

        <Row>
          {webSites.length > 0 &&
            webSites.map((element) => {
              return (
                <Col
                  md={3}
                  key={element._id}
                >
                  <Card>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      {element.category}
                    </Card.Subtitle>
                    <Button onClick={() => ViewtStatistics(element._id) }> Insights</Button>
                    <Card.Body style={{ width: '100%', height: '100%' }}>
                      <Link to={`/websites/edit/${element._id}`}>Visit</Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
        </Row>
      </Container>
       <Statistics GetStatistics={GetStatistics} id={id} />

     

      </div>
    </>
  )
}

export default Dashboard
