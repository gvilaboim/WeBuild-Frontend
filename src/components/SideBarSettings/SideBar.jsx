
import { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'

const SideBar = () => {

  const {getComponentInfo} = useContext(CanvasContext)

  const saveChangesBTN = () => {

    console.log(contentSections)
    let siteData = {
      id: websiteID,
      navbarComponents,
      contentSections,
      footerComponents,
    }
    canvasStoreService
      .saveChanges(siteData)
      .then((res) => console.log(res.data))
  }
  const isEditPage = /^\/websites\/edit\/\w+$/.test(location.pathname)

  useEffect(() => {
    
  }, [])
  
  return (
    <>
        <div>
          <div>
            <div>Component MENU</div>
            <div>Choose from the list below by dragging to your canvas</div>
          </div>
          {isEditPage && (
        <button onClick={() => saveChangesBTN()}>Save Changes</button>
      )}

        </div>
   
    </>
  )
}

export default SideBar
