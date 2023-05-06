import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'
import canvasStoreService from '../../services/canvas-store.service'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import './RightSideBar.css'
import Form from 'react-bootstrap/Form';
import set from 'lodash/set';


const RightSideBar = () => {
  const {
    webSiteID,
    contentSections,
    getComponentInfo,
    setSelectedComponent,
    selectedComponent,
    setShowSettingsSidebar,
    showSettingsSidebar,
    setContentSections,
    fetchOneWebsite
  } = useContext(CanvasContext)

  const [componentData, setComponentData] = useState({})

  //React Bootstrap
  const handleCloseSettingsSidebar = () => setShowSettingsSidebar(false)

  useEffect(() => {
    setComponentData(selectedComponent)
  }, [selectedComponent])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'style.backgroundColor') {
      if (value.startsWith('#')) {
        // Keep hex color value as is
        setComponentData(prevState => ({
          ...prevState,
          style: {
            ...prevState.style,
            backgroundColor: value,
          },
        }));
      } else {
        setComponentData(prevState => ({
          ...prevState,
          style: {
            ...prevState.style,
            backgroundColor: rgbToHex(value.r, value.g, value.b),
          },
        }));
      }
    } else {
      setComponentData(prevState => set({ ...prevState }, name, value));
    }
  };
  function rgbToHex(r, g, b) {
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(componentData);
    canvasStoreService.saveComponentChanges(componentData).then((res) => {
      console.log(componentData)
      setComponentData(componentData);
      fetchOneWebsite(webSiteID)
  })};

  return (
    <>
      <div className='right-sidebar'>
        <Offcanvas
          show={showSettingsSidebar}
          onHide={handleCloseSettingsSidebar}
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Edit a Section ({componentData.name}) </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>


          <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicText">
    <Form.Label>Text:</Form.Label>
    <Form.Control
      name="text"
      type="text"
      value={componentData.text}
      onChange={handleChange}
    />
  </Form.Group>

  {componentData.style && (
    <div>
   <Form.Group className="mb-3">
  <Form.Label>Background Color:</Form.Label>
  <div style={{ display: "flex", alignItems: "center" }}>
    <Form.Control
      name="style.backgroundColor"
      type="color"
      value={componentData.style.backgroundColor}
      onChange={handleChange}
      style={{ width: "100%" }}
    />
   
  </div>
</Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBackgroundImage">
        <Form.Label>Background Image:</Form.Label>
        <Form.Control
          name="style.backgroundImage"
          type="text"
          value={componentData.style.backgroundImage}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicHeight">
        <Form.Label>Height:</Form.Label>
        <Form.Control
          name="style.height"
          type="number"
          value={componentData.style.height}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicWidth">
        <Form.Label>Width:</Form.Label>
        <Form.Control
          name="style.width"
          type="number"
          value={componentData.style.width}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Layout:</Form.Label>
        <Form.Control
          name="style.layout.x"
          type="number"
          value={componentData.style.layout.x}
          onChange={handleChange}
        />
        <Form.Control
          name="style.layout.y"
          type="number"
          value={componentData.style.layout.y}
          onChange={handleChange}
        />
        <Form.Control
          name="style.layout.w"
          type="number"
          value={componentData.style.layout.w}
          onChange={handleChange}
        />
        <Form.Control
          name="style.layout.h"
          type="number"
          value={componentData.style.layout.h}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Padding:</Form.Label>
        <Form.Control
          name="style.padding.top"
          type="number"
          value={componentData.style.padding.top}
          onChange={handleChange}
        />
        <Form.Control
          name="style.padding.right"
          type="number"
          value={componentData.style.padding.right}
          onChange={handleChange}
        />
        <Form.Control
          name="style.padding.bottom"
          type="number"
          value={componentData.style.padding.bottom}
          onChange={handleChange}
        />
        <Form.Control
          name="style.padding.left"
          type="number"
          value={componentData.style.padding.left}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  )}

  <Button variant="primary" type="submit">
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