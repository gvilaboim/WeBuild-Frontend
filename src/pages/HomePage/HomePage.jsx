import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import './HomePage.css'

function HomePage() {
  return (
    <div className='home-page'>
      <Container>
        <h1 className='display-4'>WEBUILD</h1>
        <p className='lead'>Create your own website in minutes</p>
        <Button variant='primary'>Get started</Button>
      </Container>
    </div>
  )
}

export default HomePage
