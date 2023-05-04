import { useContext, useEffect } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'

import './NavBarDropZone.css'
import { useParams } from 'react-router-dom'

const NavBarDropZone = () => {
  const { webSiteID, navbarComponents, setNavbarComponents, saveChanges } =
    useContext(CanvasContext)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NAVBAR,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()
      saveChanges(webSiteID, { draggedComponent }).then((updatedContent) => {
        setNavbarComponents(updatedContent.navbar)
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  const style = {}

  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      className='navbar-drop-zone'
    >
      {navbarComponents.length !== 0 ? (
        navbarComponents.map((component) => {
          return <div key={component._id}>{component.name}</div>
        })
      ) : (
        <div>Drag a Header Item here</div>
      )}
    </div>
  )
}

export default NavBarDropZone
