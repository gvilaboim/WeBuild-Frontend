import React, { useContext, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { Rnd } from 'react-rnd'
import { CanvasContext } from '../../context/canvas.context'

const Subsection = ({ sectionName, subsectionName, subsection }) => {
  const [subsectionItems, setSubsectionItems] = useState([])
  const { contentSections, setContentSections } = useContext(CanvasContext)


  console.log(subsection)
  //Defines this Component as a Drop zone
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // Only accepts Items with type Body
    accept: ItemTypes.BODY,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      // Find the section and subsection to modify
      const sectionIndex = contentSections.findIndex(
        (section) => section.name === sectionName
      )

      const subsectionIndex = contentSections[
        sectionIndex
      ].subsections.findIndex(
        (subsection) => subsection.name === subsectionName
      )
      console.log(sectionIndex, subsectionIndex)
      // // Update the components array of the subsection
      contentSections[sectionIndex].subsections[subsectionIndex].components.push(
        draggedComponent
      )

      // // Update the contentSections state with the modified array
      setContentSections([...contentSections])
      setSubsectionItems(previousValues=>([...previousValues, draggedComponent]))
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
      {subsection.components.length > 0 ? (
        <>
          {subsection.components.map((comp, index) => (
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
