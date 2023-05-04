import { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'

const SideBar = () => {
  return (
    <>
      <div>
        <div>
          <div>Component MENU</div>
          <div>Choose from the list below by dragging to your canvas</div>
        </div>
      </div>
    </>
  )
}

export default SideBar
