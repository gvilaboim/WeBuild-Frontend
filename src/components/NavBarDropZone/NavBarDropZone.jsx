import { useContext } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'

import { useParams } from 'react-router-dom'
import NavBarBS from '../Bootstrap/NavBarBS'
import './NavBarDropZone.css'

const NavBarDropZone = () => {
  const { navbarComponents, setNavbarComponents, saveChanges } =
    useContext(CanvasContext)
  const { id } = useParams()

  const handleDrop = (draggedComponent) => {

    // removing the id
    const { _id, ...droppedComponent } = draggedComponent

    saveChanges(id, {
      droppedComponent,
    }).then((updatedContent) => {
      setNavbarComponents(updatedContent.navbar)
    })
  }
  
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NAVBAR,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()
      handleDrop(draggedComponent)
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
      className={navbarComponents.length === 0 ? 'navbar-drop-zone' : ''}
    >
      {navbarComponents.length !== 0 ? (
        navbarComponents.map((component) => {
          return (
            <NavBarBS
              key={component._id}
              component={component}
            />
          )
        })
      ) : (
        <div>Drag a Header Item here</div>
      )}
    </div>
  )
}

export default NavBarDropZone
