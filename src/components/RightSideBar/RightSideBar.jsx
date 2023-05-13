import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import canvasStoreService from '../../services/canvas-store.service'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import './RightSideBar.css'
import Form from 'react-bootstrap/Form'
import set from 'lodash/set'

const RightSideBar = () => {
  const {
    webSiteID,
    selectedComponent,
    setShowSettingsSidebar,
    showSettingsSidebar,
    setContentSections,
    setSelectedComponent,
  } = useContext(CanvasContext)

  const [componentData, setComponentData] = useState({})
  //React Bootstrap
  const handleCloseSettingsSidebar = () => setShowSettingsSidebar(false)

  useEffect(() => {
    setComponentData(selectedComponent)
    console.log(componentData)
  }, [selectedComponent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setComponentData((prevState) => set({ ...prevState }, name, value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await canvasStoreService.saveComponentChanges(
        webSiteID,
        componentData
      )

      setSelectedComponent(response.data.updatedComponent)
      setContentSections(response.data.updatedWebsite.sections)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='right-sidebar'>
        <Offcanvas
          show={showSettingsSidebar}
          onHide={handleCloseSettingsSidebar}
          placement='end'
          backdrop={false}
          scroll={true}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              Edit a Section ({componentData.name})
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className='mb-3'
                controlId='formBasicText'
              >
                <Form.Label>Section Name:</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  value={componentData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              {componentData.items > 0 && (
                <>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicText'
                  >
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                      name='title'
                      type='text'
                      value={componentData.items[0].content.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}

              {componentData.style && (
                <div>
                  <Form.Group className='mb-3'>
                    <Form.Label>Background Color:</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Control
                        name='style.backgroundColor'
                        type='color'
                        value={componentData.style.backgroundColor}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    className='mb-3'
                    controlId='formBasicBackgroundImage'
                  >
                    <Form.Label>Background Image:</Form.Label>
                    <Form.Control
                      name='style.backgroundImage'
                      type='text'
                      value={componentData.style.backgroundImage}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    className='mb-3'
                    controlId='formBasicHeight'
                  >
                    <Form.Label>Height:</Form.Label>
                    <Form.Control
                      name='style.height'
                      type='number'
                      value={componentData.style.height}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    className='mb-3'
                    controlId='formBasicWidth'
                  >
                    <Form.Label>Width:</Form.Label>
                    <Form.Control
                      name='style.width'
                      type='number'
                      value={componentData.style.width}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Padding:</Form.Label>
                    <Form.Control
                      name='style.padding.top'
                      type='number'
                      value={componentData.style.padding.top}
                      onChange={handleChange}
                    />
                    <Form.Control
                      name='style.padding.right'
                      type='number'
                      value={componentData.style.padding.right}
                      onChange={handleChange}
                    />
                    <Form.Control
                      name='style.padding.bottom'
                      type='number'
                      value={componentData.style.padding.bottom}
                      onChange={handleChange}
                    />
                    <Form.Control
                      name='style.padding.left'
                      type='number'
                      value={componentData.style.padding.left}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              )}

              <Button
                variant='primary'
                type='submit'
              >
                Save Component Changes
              </Button>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default RightSideBar
