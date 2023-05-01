import React, { useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'
import { CanvasProviderWrapper } from '../../context/canvas.context'
const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div className='create-page'>
      <CanvasProviderWrapper>
        {showSidebar ? (
          <CanvasStore setShowSidebar={setShowSidebar} />
        ) : (
          <button onClick={() => setShowSidebar(true)}>Show Sidebar</button>
        )}
        <Canvas />
      </CanvasProviderWrapper>
    </div>
  )
}

export default Create
