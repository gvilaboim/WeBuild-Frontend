import { useContext, useEffect } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import './FooterDropZone.css'
import { useParams } from 'react-router-dom'

const FooterDropZone = () => {
  const {footerComponents, setFooterComponents, saveChanges, setWebSiteID} = useContext(CanvasContext)


  const { id } = useParams()

  useEffect(() => {
    if (id) {
      setWebSiteID(id)
    }
  }, [id])
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FOOTER,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      saveChanges(id, { draggedComponent }).then((updatedContent) => {
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
