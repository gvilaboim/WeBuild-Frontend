import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import canvasStoreService from '../../services/canvas-store.service'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import './RightSideBar.css'
import Form from 'react-bootstrap/Form'
import set from 'lodash/set'
import { useParams } from 'react-router-dom'

const RightSideBar = () => {
  const {
    selectedComponent,
    setShowSettingsSidebar,
    showSettingsSidebar,
    setContentSections,
    setSelectedComponent,
    website,
    setWebsite
  } = useContext(CanvasContext)

  const { id } = useParams()

  const [componentData, setComponentData] = useState({})
  //React Bootstrap
  const handleCloseSettingsSidebar = () => setShowSettingsSidebar(false)

  useEffect(() => {
    setComponentData(selectedComponent)
  }, [selectedComponent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setComponentData((prevState) => set({ ...prevState }, name, value))

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(componentData)

    try {
      const response = await canvasStoreService.saveComponentChanges(
        id,
        componentData
      )

      setSelectedComponent(response.data.updatedComponent)
      // setContentSections(response.data.updatedWebsite.sections)
      setWebsite(response.data.updatedWebsite)
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

            {componentData.navLinks && componentData.navLinks.length > 0 && (
              <Form.Group
                className='mb-3'
                controlId='formBasicBackgroundImage'
              >
                <Form.Label>NavLinks:</Form.Label>
                <Form.Control
                  name='navLinks[0].text'
                  type='text'
                  value={componentData.navLinks[0].text}
                  onChange={handleChange}
                />

                <Form.Control
                  name='navLinks[1].text'
                  type='text'
                  value={componentData.navLinks[1].text}
                  onChange={handleChange}
                />
                    <Form.Control
                  name='navLinks[2].text'
                  type='text'
                  value={componentData.navLinks[2].text}
                  onChange={handleChange}
                />
                {componentData.navLinks[3]?.text && (
                  <Form.Control
                  name='navLinks[3].text'
                  type='text'
                  value={componentData.navLinks[3]?.text}
                  onChange={handleChange}
                />
                )}
                     {componentData.navLinks[4]?.text && (
                    <Form.Control
                  name='navLinks[4].text'
                  type='text'
                  value={componentData.navLinks[4]?.text}
                  onChange={handleChange}
                />   )}


              </Form.Group>
              

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
                    controlId='formBasicBackgroundImage'
                  >
                    <Form.Label>Align Items :</Form.Label>
                    <Form.Control
                      name='style.alignItems'
                      type='text'
                      value={componentData.style.alignItems}
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
                    <Form.Label> Padding Top:</Form.Label>
                    <Form.Control
                      name='style.padding.top'
                      type='number'
                      value={componentData.style.padding.top}
                      onChange={handleChange}
                    />
                    <Form.Label>Padding Right:</Form.Label>
                    <Form.Control
                      name='style.padding.right'
                      type='number'
                      value={componentData.style.padding.right}
                      onChange={handleChange}
                    />
                    <Form.Label>Padding Bottom:</Form.Label>

                    <Form.Control
                      name='style.padding.bottom'
                      type='number'
                      value={componentData.style.padding.bottom}
                      onChange={handleChange}
                    />
                    <Form.Label>Padding Left:</Form.Label>

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
