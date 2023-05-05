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

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FOOTER,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      //removing the id
      let droppedComponent = {
        type: draggedComponent.type,
        name: draggedComponent.name,
        layout: draggedComponent.layout,
        bgColor: draggedComponent.bgColor,
      }

      console.log(id)
      saveChanges(id, {
        droppedComponent,
      }).then((updatedContent) => {
        setFooterComponents(updatedContent.footer)
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
