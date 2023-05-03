import React, { useContext, useEffect, useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'
import canvasStoreService from '../../services/canvas-store.service'
import { useLocation, useParams } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'
import SideBar from '../../components/SideBarSettings/SideBar'

const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [websiteItems, setWebsiteItems] = useState()
  const {webSiteID, setWebSiteID , fetchOneWebsite} = useContext(CanvasContext)
  const {id} = useParams();

  useEffect(() => {
      setWebSiteID(id)
      fetchOneWebsite(webSiteID)
  
  }, [])

  return (
    <div className='create-page'>
      {showSidebar ? (
        <CanvasStore setShowSidebar={setShowSidebar} />
      ) : (
        <button onClick={() => setShowSidebar(true)}>Show Sidebar</button>
      )}
      <Canvas />

      <SideBar/>
    </div>
  )
}

export default Create
