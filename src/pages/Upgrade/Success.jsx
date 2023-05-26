import React, { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import { Button, Card, Container } from 'react-bootstrap'

const Success = () => {
  const { updatePlan, userPlan } = useContext(CanvasContext)

  useEffect(() => {
    const url = window.location.href
    const sessionId = url.split('=')[1] // Extract the session ID from the URL
    updatePlan(sessionId) // Call the updatePlan function with the session ID
  }, [])

  return (
    <Container className='h-100'>
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
        <h1 className='pb-5 w-50'>Thanks for subscribing to the {userPlan.name} plan!</h1>
        <Button className='p-4' href='/dashboard' variant='outline-dark'>Start Creating</Button>
      </div>
    </Container>
  )
}

export default Success
