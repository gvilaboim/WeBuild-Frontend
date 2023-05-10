import DraggableComponent from '../DraggableComponent/DraggableComponent'
import { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Nav, Accordion, Button } from 'react-bootstrap'

import './CanvasStore.css'

const CanvasStore = () => {
  const { storeComponents, fetchStoreItems } = useContext(CanvasContext)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    fetchStoreItems()
  }, [])

  return (
    <div className='left-sidebar'>
      <Button
        style={{ height: '100%' }}
        variant='outline-dark'
        onClick={handleShow}
      >
        ╰(*°▽°*)╯
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add A Section</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {storeComponents.length > 0 ? (
            <Accordion >
              <Accordion.Item eventKey='0'>
                <Accordion.Header >Navbar</Accordion.Header>
                {storeComponents.map(
                  (component, index) =>
                    component.type === 'navbar' && (
                      <Accordion.Body key={index}>
                        <DraggableComponent
                          key={component._id}
                          component={component}
                          closeSidebar={handleClose}
                        />
                      </Accordion.Body>
                    )
                )}
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Main Section</Accordion.Header>
                {storeComponents.map(
                  (component, index) =>
                    component.type === 'body' && (
                      <Accordion.Body key={index}>
                        <DraggableComponent
                          key={component._id}
                          component={component}
                          closeSidebar={handleClose}
                        />
                      </Accordion.Body>
                    )
                )}
              </Accordion.Item>
              <Accordion.Item eventKey='2'>
                <Accordion.Header >Footer</Accordion.Header>
                {storeComponents.map(
                  (component, index) =>
                    component.type === 'footer' && (
                      <Accordion.Body key={index}>
                        <DraggableComponent
                          key={component._id}
                          component={component}
                          closeSidebar={handleClose}
                        />
                      </Accordion.Body>
                    )
                )}
              </Accordion.Item>
            </Accordion>
          ) : (
            <Loading />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default CanvasStore
