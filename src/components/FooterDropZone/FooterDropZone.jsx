import { useContext, useEffect } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import './FooterDropZone.css'
import { useParams } from 'react-router-dom'

const FooterDropZone = () => {
  const { footerComponents, setFooterComponents, saveChanges } =
    useContext(CanvasContext)

  const { id } = useParams()

  const handleDrop = (draggedComponent) => {
    //removing the id
    const { _id, ...droppedComponent } = draggedComponent

    saveChanges(id, {
      droppedComponent,
    }).then((updatedContent) => {
      setFooterComponents(updatedContent.footer)
    })
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FOOTER,
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
      className='footer-drop-zone'
    >
      {footerComponents.length !== 0 ? (
        footerComponents.map((component) => {
          return <div key={component._id}>{component.name}</div>
        })
      ) : (
        <div>Drag a Footer here</div>
      )}
    </div>
  )
}

export default FooterDropZone
