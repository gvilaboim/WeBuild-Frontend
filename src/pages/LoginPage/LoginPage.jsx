import './LoginPage.css'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import authService from '../../services/auth.service'
import { Alert, Button, Container, Form } from 'react-bootstrap'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password }

    // Send a request to the server using  a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/')
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
      <div className='LoginPage'>
        <h1>Login</h1>

        <Form onSubmit={handleLoginSubmit}>
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

          <Button
          className='mt-3'
            variant='dark'
            type='submit'
          >
            Login
          </Button>
        </Form>
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

        <p>Don't have an account yet?</p>
        <Link to={'/signup'}> Sign Up</Link>
      </div>
    </Container>
  )
}

export default LoginPage
