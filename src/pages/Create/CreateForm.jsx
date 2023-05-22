import { useState } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import './Create.css'
import canvasStoreService from '../../services/canvas-store.service'
import { useNavigate } from 'react-router-dom'

function CreateForm() {
  const [siteData, setSiteData] = useState({ name: '', category: '' })
  const { name, category } = siteData

  const navigate = useNavigate()

  const handleChange = (e) => {
    setSiteData((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    canvasStoreService.createWebSite(siteData).then((res) => {
      navigate(`/websites/edit/${res.data._id}`)
    })
  }

  return (
    <Card className='dashboard-card p-5 h-100'>
      <h3 className='mb-3'>Create a new Website!</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label
            column
            md={3}
          >
            Name:
          </Form.Label>
          <Col md={9}>
            <Form.Control
              className='mb-3'

              type='text'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label
            column
            md={3}
          >
            Category:
          </Form.Label>
          <Col md={9}>
            <Form.Control
              className='mb-3'
              type='text'
              name='category'
              value={category}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button
          className='m-0'
          variant='dark'
          type='submit'
        >
          Create new Website
        </Button>
      </Form>
    </Card>
  )
}

export default CreateForm
