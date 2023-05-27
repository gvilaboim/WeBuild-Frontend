import Container from 'react-bootstrap/Container'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import Button from 'react-bootstrap/Button'
import { CanvasContext } from '../../context/canvas.context'
import './NavigationBar.css'
const NavigationBar = () => {
  const { user } = useContext(AuthContext)
  const { fetchUserInfo, website } = useContext(CanvasContext)

  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (user) {
      fetchUserInfo(user._id)
    }
  }, [user])

  useEffect(() => {
    if(website && user){

    
    setIsOwner(website.user._id === user._id)
  }
  }, [])

  return (
    <>
      <Button
        className='px-1 text-white w-100 sticky-top rounded-0'
        variant='dark'
        href='/dashboard'
      >
        {isOwner ? (
          <Container>
            <h6 className='fw-bold my-auto py-2'>
              WeBuild - Upgrade your Plan to remove this banner
            </h6>
          </Container>
        ) : (
          <Container>
            <div className='mx-auto text-white'>
              This website was created with our Powerful Engine, what are you
              waiting for?
            </div>
          </Container>
        )}
      </Button>
    </>
  )
}

export default NavigationBar
