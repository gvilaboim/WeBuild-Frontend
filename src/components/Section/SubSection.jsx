import React, { useContext } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'

const SubSection = ({ title }) => {
  const { bodyComponents, setBodyComponents } = useContext(CanvasContext)
  //Defines this Component as a Drop zone
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // Only accepts Items with type Body
    accept: ItemTypes.BODY,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      //on Drop, add to this components array of items to render
      setBodyComponents((previousValues) => [
        ...previousValues,
        draggedComponent,
      ])
    },
    collect: (monitor) => ({
      // collects properties to be used for logic and styling
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
    >
      {bodyComponents.length > 0 ? bodyComponents.map((comp) => comp.name) 
      : <div> You can drop an item here </div>}
    </div>
  )
}

export default SubSection
