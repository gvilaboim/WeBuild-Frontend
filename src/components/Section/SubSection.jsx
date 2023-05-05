import React, { useContext, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import Component from '../Component/Component'
import CloseButton from 'react-bootstrap/CloseButton'

const Subsection = ({ sectionName, subsectionName, subsection }) => {
  const {
    webSiteID,
    getComponentInfo,
    contentSections,
    setContentSections,
    saveChanges,
    setShowSettingsSidebar,
  } = useContext(CanvasContext)

  const [showDeleteBtn, setShowDeleteBtn] = useState(false)

  const handleShowSettingsSidebar = () => setShowSettingsSidebar(true)
  const handleShowDeleteBtn = () => setShowDeleteBtn(true)
  const handleHideDeleteBtn = () => setShowDeleteBtn(false)

  const handleDrop = async (draggedComponent) => {
    // Find the section and subsection to modify
    const sectionIndex = contentSections.findIndex(
      (section) => section.name === sectionName
    )

    const subsectionIndex = contentSections[sectionIndex].subsections.findIndex(
      (subsection) => subsection.name === subsectionName
    )

    //removing the id
    let droppedComponent = {
      type: draggedComponent.type,
      name: draggedComponent.name,
      htmlTag: draggedComponent.htmlTag,
      category: draggedComponent.category,
      text: draggedComponent.text,
      style: draggedComponent.style,
    }
    saveChanges(webSiteID, {
      droppedComponent,
      sectionIndex,
      subsectionIndex,
    }).then((updatedContent) => {
      setContentSections(updatedContent.sections)
    })
  }

  //Defines this Component as a Drop zone
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // Only accepts Items with type Body
    accept: ItemTypes.BODY,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      handleDrop(draggedComponent)
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
      onMouseLeave={handleHideDeleteBtn}
      onMouseEnter={handleShowDeleteBtn}
    >
      {subsection.components.length > 0 ? (
        <>
          {showDeleteBtn && (
            <div className='delete-subsection'>
              <CloseButton
                variant='white'
              
              />
            </div>
          )}

          {/* 
            Option 1 - Create a Tag
            let htmlTag = comp.htmlTag;
            let elementProps = {
              key: comp._id,
              className: 'sub-section-item',
              onClick: () => getComponentInfo(comp),
              src: comp.src
            };
            return React.createElement("img", elementProps); */}
          {/* Option2 below - Render the same component with diferent props*/}
          {subsection.components.map((component) => (
            <Component
              key={component._id}
              component={component}
              showSettings={handleShowSettingsSidebar}
            />
          ))}
        </>
      ) : (
        <div> You can drop an item here </div>
      )}
    </div>
  )
}

export default Subsection
