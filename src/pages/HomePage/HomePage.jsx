import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import './HomePage.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

function HomePage() {
  return (
    <div className='home-page'>
      <Container>
        <h1 className='display-2'>WEBUILD</h1>
        <p className='lead'>Create your own website in minutes</p>
        <Button
          className='mt-3'
          href='/dashboard'
          variant='dark'
        >
          Get started
        </Button>
      </Container>
    </div>
  )
}

export default HomePage
