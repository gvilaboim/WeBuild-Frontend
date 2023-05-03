import React, { useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { Rnd } from 'react-rnd'

const Subsection = ({ title }) =>   {
  
  const [subsectionItems, setSubsectionItems] = useState([])

  //Defines this Component as a Drop zone
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // Only accepts Items with type Body
    accept: ItemTypes.BODY,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      //on Drop, add to this components array of items to render
      setSubsectionItems((previousValues) => [
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
      className='sub-section'
    >
      {subsectionItems.length > 0 ? (
        <>
          {subsectionItems.map((comp, index) => (
            <Rnd
              key={index}
              bounds='parent'
              className='sub-section-item'
            >
              {comp.name}
            </Rnd>
          ))}
        </>
      ) : (
        <div> You can drop an item here </div>
      )}
    </div>
  )
}

export default Subsection
