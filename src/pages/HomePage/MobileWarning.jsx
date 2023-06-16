import React from 'react'
import { Button, Container } from 'react-bootstrap'

const MobileWarning = () => {
  return (
    <Container className='d-flex flex-column justify-content-center h-100 align-items-center '>
      <h1 className='p-5 text-start'>Welcome to WeBuild</h1>
      <h3 className='lead p-5 text-start'>
        Please note that this app is optimized for use on desktop and laptop
        computers.
        <br />
        <br />
        While you can still use the app on your phone, it may be more difficult
        to edit pages and sections due to the smaller screen size.
        <br />
        <br />
        If you're having trouble, we recommend using a larger device for the
        best experience.
      </h3>
      <Button
        className='px-5 mt-3 '
        href='/dashboard'
        variant='outline-dark'
      >
        Dive in
      </Button>
    </Container>
  )
}

export default MobileWarning
