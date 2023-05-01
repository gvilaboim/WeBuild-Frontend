import { useContext } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import './FooterDropZone.css'

const FooterDropZone = () => {
  const {footerComponents, setFooterComponents} = useContext(CanvasContext)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FOOTER,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      setFooterComponents((previousValues) => [
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
      className='footer-drop-zone'
    >
      {footerComponents.length !== 0 ? (
        footerComponents.map((component) => {
          return <div key={component._id}>{component.title}</div>
        })
      ) : (
        <div>Drag a Footer here</div>
      )}
    </div>
  )
}

export default FooterDropZone
