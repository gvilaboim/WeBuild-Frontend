import React, { useContext, useEffect, useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'
import canvasStoreService from '../../services/canvas-store.service'
import { useLocation } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'

const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [websiteItems, setWebsiteItems] = useState()
  const [websiteID, setWebsiteID] = useState('')
  const location = useLocation()
  const regex = /^.*\/websites\/edit\/(\w+)$/
  const match = location.pathname.match(regex)

  const { fetchOneWebsite } = useContext(CanvasContext)
  useEffect(() => {
    if (match) {
      const id = match[1]
      setWebsiteID(id)
      fetchOneWebsite(id)
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
