import DraggableComponent from '../DraggableComponent/DraggableComponent'
import { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import './CanvasStore.css'

const CanvasStore = ({ setShowSidebar }) => {
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
        style={{height: "100%"}}
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
          <Offcanvas.Title>Add a Section</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {storeComponents.length > 0 ? (
            storeComponents.map((component) => {
              return (
                <DraggableComponent
                  key={component._id}
                  component={component}
                  closeSidebar={handleClose}
                />
              )
            })
          ) : (
            <Loading />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default CanvasStore
