import { useContext } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import { useParams } from 'react-router-dom'
import Footer from '../Bootstrap/Footer'
import './FooterDropZone.css'

const FooterDropZone = () => {
  const {
    website,
    setWebsite,
    saveChanges,
    publicView,
    setShowSettingsSidebar,
  } = useContext(CanvasContext)

  const { id } = useParams()

  const handleDrop = (draggedComponent) => {
    //removing the id
    const { _id, ...droppedComponent } = draggedComponent

    saveChanges(id, {
      droppedComponent,
    }).then((updatedContent) => {
      setWebsite(updatedContent)
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
  const style = publicView ? {} : { border: '1px dashed black' }
  const className =
    website && website.footer && website.footer.length === 0
      ? 'footer-drop-zone'
      : ''
  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor  }}
      className={className}
    >
      {website &&
        website.footer &&
        website.footer.map((component) => {
          console.log(component)
          return (
            <Footer
              key={component._id}
              component={component}
              showSettings={setShowSettingsSidebar}
            />
          )
        })}

      {website &&
        website.footer &&
        website.footer.length === 0 &&
        !publicView && <div>Drag a Footer Item here</div>}
    </div>
  )
}

export default FooterDropZone
