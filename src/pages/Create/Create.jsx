import React, { useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'
const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)
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
