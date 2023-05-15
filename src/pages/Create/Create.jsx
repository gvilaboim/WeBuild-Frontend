import React, { useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'

import RightSideBar from '../../components/RightSideBar/RightSideBar'

const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className='create-page'>
      {showSidebar ? (
        <CanvasStore setShowSidebar={setShowSidebar} />
      ) : (
        <button onClick={() => setShowSidebar(true)}>Show Sidebar</button>
      )}
      <Canvas publicView={false}/>

      <RightSideBar />
    </div>
  )
}

export default Create
