import React, { useContext, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import Component from '../Component/Component'
import CloseButton from 'react-bootstrap/CloseButton'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger'
import Tooltip from 'react-bootstrap/esm/Tooltip'

const Subsection = ({
  sectionName,
  sectionId,
  subsectionName,
  subsection,
  handleDeleteSubsection,
  toggleHints,
  setShowToast,
  showToast,
}) => {
  const {
    getComponentInfo,
    webSiteID,
    contentSections,
    setContentSections,
    saveChanges,
    setShowSettingsSidebar,
  } = useContext(CanvasContext)

  const handleShowSettingsSidebar = () => setShowSettingsSidebar(true)

  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const handleShowDeleteBtn = () => setShowDeleteBtn(true)
  const handleHideDeleteBtn = () => setShowDeleteBtn(false)

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const handleShowDeleteConfirmation = () => {
    //user tries to delete a subsection
    // check if it is the last one
    // and has content
    if (contentSections.length === 2 || (subsection.length !== 1 && subsection.components.length === 0)) {
      handleDeleteSubsection(webSiteID, subsection._id, sectionId)
    } else {
      setShowConfirmDelete(true)
    }
  }
  const handleHideDeleteConfirmation = () => setShowConfirmDelete(false)

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
      draggedComponent: droppedComponent,
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
              getComponentInfo={getComponentInfo}
              componentInfo={component}
              setContentSections={setContentSections}
              contentSections={contentSections}
            />
          ))}
        </>
      ) : (
        <div> You can drop an item here </div>
      )}
      {showDeleteBtn && (
        <>
          <div className='delete-subsection'>
            {showToast ? (
              <OverlayTrigger
                key={'right'}
                placement={'right'}
                overlay={
                  <Tooltip>You should not have less than 2 Sections.</Tooltip>
                }
              >
                <CloseButton
                  onClick={handleShowDeleteConfirmation}
                  variant='white'
                />
              </OverlayTrigger>
            ) : (
              <CloseButton
                onClick={handleShowDeleteConfirmation}
                variant='white'
              />
            )}
          </div>
        </>
      )}
      <Modal
        show={showConfirmDelete}
        onHide={handleHideDeleteConfirmation}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This module has content in it. If you continue, all data will be lost!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={toggleHints}
          >
            Close
          </Button>
          <Button
            variant='secondary'
            onClick={handleHideDeleteConfirmation}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() =>
              handleDeleteSubsection(webSiteID, subsection._id, sectionId)
            }
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Subsection
