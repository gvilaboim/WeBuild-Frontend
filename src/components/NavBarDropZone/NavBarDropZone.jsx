import { useContext } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'

import './NavBarDropZone.css'

const NavBarDropZone = () => {

  const {navbarComponents, setNavbarComponents} = useContext(CanvasContext)
  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NAVBAR,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      setNavbarComponents((previousValues) => [
        ...previousValues,
        draggedComponent,
      ]) 
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
          return <div key={component._id}>{component.title}</div>
        })
      ) : (
        <div>Drag a Header Item here</div>
      )}
    </div>
  )
}

export default NavBarDropZone
