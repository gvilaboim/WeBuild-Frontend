import { useContext, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'

import { useParams } from 'react-router-dom'
import NavBarBS from '../Bootstrap/NavBarBS'
import './NavBarDropZone.css'

const NavBarDropZone = () => {
<<<<<<< HEAD
  const { navbarComponents, setNavbarComponents, saveChanges, publicView ,    setShowSettingsSidebar,
    setSelectedComponent } =
=======
  const { website, setWebsite, saveChanges, publicView } =
>>>>>>> 66ac551e298565d8a953720515352d19dbe60529
    useContext(CanvasContext)
  const { id } = useParams()
  const [isEditing, setIsEditing] = useState(false)


  const handleDrop = (draggedComponent) => {
    // removing the id
    const { _id, ...droppedComponent } = draggedComponent

    saveChanges(id, {
      droppedComponent,
    }).then((updatedContent) => {
      setWebsite(updatedContent)
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
  const style = publicView ? {} : { border: '1px dashed black' }

  const className =
    website && website.navbar && website.navbar.length === 0
      ? 'navbar-drop-zone'
      : ''
  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      className={className}
    >
      {navbarComponents.length !== 0 ? (
        navbarComponents.map((component) => {
          return (
            <NavBarBS
              key={component._id}
              component={component}
              showSettings={handleShowSettingsSidebar}
            />
          )
        })
      ) : (
        <>{!publicView && <div>Drag a Header Item here</div>}</>
      )}
      {website &&
        website.navbar &&
        website.navbar.map((component) => (
          <NavBarBS
            key={component._id}
            component={component}
          />
        ))}
      {website &&
        website.navbar &&
        website.navbar.length === 0 &&
        !publicView && <div>Drag a Header Item here</div>}
    </div>
  )
}

export default NavBarDropZone
