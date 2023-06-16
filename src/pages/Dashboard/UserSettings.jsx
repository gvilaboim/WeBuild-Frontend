import React, { useContext, useEffect, useState } from 'react'
import canvasStoreService from '../../services/canvas-store.service'
import { AuthContext } from '../../context/auth.context'
import { CanvasContext } from '../../context/canvas.context'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Col, Figure, Row } from 'react-bootstrap'
const UserSettings = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const { fetchUserInfo, userPlan, userInfo, setUserInfo, UpdateUserInfo, isMobile } =
    useContext(CanvasContext)


  useEffect(() => {
    const loadInfoUser = async () => {
      try {
        const loadedUserInfo = await fetchUserInfo(user._id)
      } catch (error) {
        console.log(error)
      }
    }
    loadInfoUser()
  }, [])

  const handleChange = (e) => {
    setUserInfo((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const SaveInfoUser = async (userInfo) => {
      try {
        const loadedUserInfo = await UpdateUserInfo(userInfo)
        console.log(loadedUserInfo)
        setUserInfo(userInfo)
      } catch (error) {
        console.log(error)
      }
    }
    SaveInfoUser(userInfo)
  }

  return (
    <>

      <Col md={6} className={isMobile ? ' ': 'px-5 d-flex flex-column justify-content-center'}>
        {userInfo && (
          <Form onSubmit={handleSubmit} className='px-5'>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={userInfo.name}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='text'
                name='email'
                value={userInfo.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
            className='mt-3'
              variant='dark'
              type='submit'
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Col>
      <Col md={6}>
        <div
          className='profile-pic'
          style={{background: `no-repeat center/40% url(${user.profilePic})`}}
        ></div>
        <Button variant='dark'>Change your Photo</Button>
      </Col>
    </>
  )
}

export default UserSettings
