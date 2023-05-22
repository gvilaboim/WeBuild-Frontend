import './SignupPage.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'
import { Form, Button, Alert, Container } from 'react-bootstrap'

function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleName = (e) => setName(e.target.value)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    // Create an object representing the request body
    const requestBody = { email, password, name }

    // Send a request to the server using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate('/login')
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <Container
      fluid
      className='p-0 m-0'
    >
      <div className='SignupPage'>
        <h1>Sign Up</h1>

        <Form
          className='form-row'
          onSubmit={handleSignupSubmit}
        >
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={email}
              onChange={handleEmail}
              placeholder='Enter email'
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password}
              onChange={handlePassword}
              placeholder='Enter password'
            />
          </Form.Group>

          <Form.Group controlId='formBasicName'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={name}
              onChange={handleName}
              placeholder='Enter name'
            />
          </Form.Group>

          <Button
            className='mt-3'
            variant='dark'
            type='submit'
          >
            Sign Up
          </Button>
        </Form>

        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

        <p>Already have an account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    </Container>
  )
}

export default SignupPage
