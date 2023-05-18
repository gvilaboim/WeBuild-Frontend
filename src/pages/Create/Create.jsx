import { useContext, useEffect, useState } from 'react'
import CanvasStore from '../../components/CanvasStore/CanvasStore'
import Canvas from '../../components/Canvas/Canvas'
import './Create.css'

import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { CanvasContext } from '../../context/canvas.context'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

const Create = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const { fetchOneWebsite, website } = useContext(CanvasContext)
  const { id } = useParams()

  useEffect(() => {
    fetchOneWebsite(id)
  }, [])

  return (
    <div className='create-page'>
      {showSidebar ? (
        <CanvasStore setShowSidebar={setShowSidebar} />
      ) : (
        <button onClick={() => setShowSidebar(true)}>Show Sidebar</button>
      )}

      {website ? <Canvas website={website} /> : <Loading />}

      <RightSideBar />
    </div>
  )
}

export default Create
