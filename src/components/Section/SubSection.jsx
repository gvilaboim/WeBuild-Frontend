import React, { useContext, useEffect } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { Rnd } from 'react-rnd'
import { CanvasContext } from '../../context/canvas.context'

const Subsection = ({ sectionName, subsectionName, subsection }) => {
  const {
    webSiteID,
    getComponentInfo,
    contentSections,
    setContentSections,
    saveChanges,
  } = useContext(CanvasContext)

  // useEffect(() => {
  //   console.log('subsection', subsection)
  // }, [subsection])

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

      saveChanges({
        id: webSiteID,
        draggedComponent,
        sectionIndex,
        subsectionIndex,
      }).then((updatedContentSections) => {
        setContentSections(updatedContentSections)
      })
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
              key={comp._id}
              bounds='parent'
              className='sub-section-item'
              onClick={() => getComponentInfo(comp)}
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
