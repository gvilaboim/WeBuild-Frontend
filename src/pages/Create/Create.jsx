import React, { useEffect, useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'
import canvasStoreService from '../../services/canvas-store.service'
import { useLocation } from 'react-router-dom'

const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [websiteItems, setWebsiteItems] = useState()
  const [websiteID, setWebsiteID] = useState('')
  const location = useLocation()
  const regex = /^.*\/websites\/edit\/(\w+)$/
  const match = location.pathname.match(regex)

  useEffect(() => {
    if (match) {
      const id = match[1]
      setWebsiteID(id)
      canvasStoreService.getOneWebsite(id).then(response => {
        setWebsiteItems(response.data)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [])

  return (
    <div className='create-page'>
      {showSidebar ? (
        <CanvasStore setShowSidebar={setShowSidebar} />
      ) : (
        <button onClick={() => setShowSidebar(true)}>Show Sidebar</button>
      )}
      <Canvas />
    </div>
  )
}

export default Create