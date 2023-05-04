import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'
import canvasStoreService from '../../services/canvas-store.service'

const SideBar = () => {
  
  const { webSiteID, contentSections , getComponentInfo , setSelectedComponent , selectedComponent} = useContext(CanvasContext)

  const [componentData, setComponentData] = useState({})

  useEffect(() => {
    setComponentData(selectedComponent)
  }, [selectedComponent])
  

  const handleChange = (e) => {
    setComponentData((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(componentData)
   canvasStoreService.saveComponentChanges(componentData).then((res) => {
    console.log(res.data)
    })
  }

  return (
    <>
      <div>
       <form onSubmit={handleSubmit}> 
          <div>Component {componentData.name }</div>
          <label> <b> ID: </b>{componentData._id } </label>
          <br/> 
          <label> Type: </label>
          <input type="text"  value={componentData.type} /> 
          <br/> 
          <label> Name: </label>
          <input  name="name" type="text" value={componentData.name } onChange={handleChange}/>
          <br/> 
          <label> Text: </label>
          <input  name="text" type="text" value={componentData.text } onChange={handleChange}/>
          <br/> 

          <label> Border: </label>
          <input  name="border" type="text" value={componentData.border } onChange={handleChange}/>
          <br/> 
          <label> Color: </label>
          <input  name="color" type="text" /* onChange={handleChange} *//>

          <br/> 
          <label> Padding: </label>
          <input name="padding" type="text" onChange={handleChange}/>

          <br/> 
          <label> Style: </label>
          <textarea  name="style" type="text" value={componentData.style } onChange={handleChange}/>
          <br/> 
          <button type='submit' > Save Component Changes</button>
          </form>
      </div>
    </>
  )
}

export default SideBar
