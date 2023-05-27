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
    setSelectedComponent,
    setWebsite,
    setIsSaving,
    isSaving
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
    setIsSaving(true);
    try {
      const response = await canvasStoreService.saveComponentChanges(
        id,
        componentData
      )

      setSelectedComponent(response.data.updatedComponent)
      setWebsite(response.data.updatedWebsite)
      setIsSaving(false);
      console.log(response.data.updatedWebsite)
    } catch (error) {
      console.log(error)
      setIsSaving(false);
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
          <Offcanvas.Body className='pt-0'>
            <Form onSubmit={handleSubmit}>
              <div className='mb-3 sticky-top bg-white'>
                <Button
                  variant='dark'
                  className='mb-5'
                  type='submit'
                  style={{ width: '100%' }}
                >
                  Save Component Changes
                </Button>
              </div>
              <Form.Group className='mb-3'>
                <Form.Label>Section Name:</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  value={componentData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              {componentData.brand && (
                <>
                  <Form.Group className='mb-3'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      name='brand.text'
                      type='text'
                      value={componentData.brand.text}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}
              {componentData.items > 0 && (
                <>
                  <Form.Group className='mb-3'>
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
                <Form.Group className='mb-3'>
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
                    />
                  )}
                </Form.Group>
              )}

              {componentData?.items?.[0]?.content && componentData.items[0].content?.image && (
                <Form.Group className='mb-3'>
                  <Form.Label>Image:</Form.Label>
                  <Form.Control
                    name='items[0].content.image.src'
                    type='text'
                    value={componentData.items[0].content?.image.src || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              )}

              {componentData.items && componentData.items[0]?.image && (

<> 
                <Form.Group
                  className='mb-3'
                  controlId='formBasicBackgroundImage'
                >
                  <Form.Label>Image:</Form.Label>
                  <Form.Control
                    name='items[0].image.src'
                    type='text'
                    value={componentData.items[0].image.src}
                    onChange={handleChange}
                  />
                </Form.Group>

                  
<Form.Group
className='mb-3'
controlId='formBasicHeight'
>
<Form.Label> Image Height:</Form.Label>
<Form.Control
  name='items[0].image.style.height'
  type='number'
  value={componentData.items[0].image.style.height}
  onChange={handleChange}
/>
</Form.Group>
<Form.Group
className='mb-3'
controlId='formBasicHeight'
>
<Form.Label> Image width:</Form.Label>
<Form.Control
  name='items[0].image.style.width'
  type='number'
  value={componentData.items[0].image.style.width}
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

              {componentData.items &&
                componentData.items.content &&
                componentData.items[0]?.content.headers && (
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicBackgroundImage'
                  >
                    <Form.Label>
                      Section:{' '}
                      {componentData.items[0].content.headers[0].header.text}
                    </Form.Label>
                    <Form.Control
                      name='items[0].content.headers[0].header.text'
                      type='text'
                      value={
                        componentData.items[0].content.headers[0].header.text
                      }
                      onChange={handleChange}
                    />

                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[0].links &&
                      componentData.items[0].content.headers[0].links[0] && (
                        <Form.Control
                          name='items[0].content.headers[0].links[0].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[0].links[0]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[0].links &&
                      componentData.items[0].content.headers[0].links[1] && (
                        <Form.Control
                          name='items[0].content.headers[0].links[1].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[0].links[1]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[0].links &&
                      componentData.items[0].content.headers[0].links[2] && (
                        <Form.Control
                          name='items[0].content.headers[0].links[2].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[0].links[2]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[0].links &&
                      componentData.items[0].content.headers[0].links[3] && (
                        <Form.Control
                          name='items[0].content.headers[0].links[3].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[0].links[3]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}

                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[0].links &&
                      componentData.items[0].content.headers[0].links[4] && (
                        <Form.Control
                          name='items[0].content.headers[0].links[4].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[0].links[4]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                  </Form.Group>
                )}

              {componentData.items &&
                componentData.items.content &&
                componentData.items[0]?.content.headers && (
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicBackgroundImage'
                  >
                    <Form.Label>
                      Section:{' '}
                      {componentData.items[0].content.headers[1].header.text}
                    </Form.Label>
                    <Form.Control
                      name='items[0].content.headers[1].header.text'
                      type='text'
                      value={
                        componentData.items[0].content.headers[1].header.text
                      }
                      onChange={handleChange}
                    />

                    {componentData.items[0].content.headers[1].links &&
                      componentData.items[0].content.headers[1].links[0] && (
                        <Form.Control
                          name='items[0].content.headers[1].links[0].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[1].links[0]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items[0].content.headers[1].links &&
                      componentData.items[0].content.headers[1].links[1] && (
                        <Form.Control
                          name='items[0].content.headers[1].links[1].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[1].links[1]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items[0].content.headers[0].links &&
                      componentData.items[0].content.headers[1].links[2] && (
                        <Form.Control
                          name='items[0].content.headers[1].links[2].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[1].links[2]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items[0].content.headers[1].links &&
                      componentData.items[0].content.headers[1].links[3] && (
                        <Form.Control
                          name='items[0].content.headers[1].links[3].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[1].links[3]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}

                    {componentData.items[0].content.headers[1].links &&
                      componentData.items[0].content.headers[1].links[4] && (
                        <Form.Control
                          name='items[0].content.headers[1].links[4].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[1].links[4]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                  </Form.Group>
                )}

              {componentData.items &&
                componentData.items.content &&
                componentData.items[0]?.content.headers && (
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicBackgroundImage'
                  >
                    <Form.Label>
                      Section:{' '}
                      {componentData.items[0].content.headers[2].header.text}
                    </Form.Label>
                    <Form.Control
                      name='items[0].content.headers[2].header.text'
                      type='text'
                      value={
                        componentData.items[0].content.headers[2].header.text
                      }
                      onChange={handleChange}
                    />

                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[2].links &&
                      componentData.items[0].content.headers[2].links[0] && (
                        <Form.Control
                          name='items[0].content.headers[2].links[0].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[2].links[0]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[2].links &&
                      componentData.items[0].content.headers[2].links[1] && (
                        <Form.Control
                          name='items[0].content.headers[2].links[1].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[2].links[1]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[2].links &&
                      componentData.items[0].content.headers[2].links[2] && (
                        <Form.Control
                          name='items[0].content.headers[2].links[2].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[2].links[2]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[2].links &&
                      componentData.items[0].content.headers[2].links[3] && (
                        <Form.Control
                          name='items[0].content.headers[2].links[3].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[2].links[3]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}

                    {componentData.items &&
                      componentData.items.content &&
                      componentData.items[0].content.headers[2].links &&
                      componentData.items[0].content.headers[2].links[4] && (
                        <Form.Control
                          name='items[0].content.headers[2].links[4].text'
                          type='text'
                          value={
                            componentData.items[0].content.headers[2].links[4]
                              .text
                          }
                          onChange={handleChange}
                        />
                      )}
                  </Form.Group>
                )}
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default RightSideBar

