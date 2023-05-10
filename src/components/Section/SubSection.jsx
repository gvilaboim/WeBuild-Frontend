import React, { useContext, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import Component from '../Component/Component'
import CloseButton from 'react-bootstrap/CloseButton'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger'
import Tooltip from 'react-bootstrap/esm/Tooltip'
import Pricing from '../Bootstrap/Pricing'
import Hero from '../Bootstrap/Hero'

const Subsection = ({
  sectionId,
  subsection,
  handleDeleteSubsection,
  toggleHints,
  showToast,
}) => {
  const {
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
    // and has content and shows a confirmation message
    if (
      contentSections.length === 2 ||
      (subsection.length !== 1 && subsection.components.length === 0)
    ) {
      handleDeleteSubsection(webSiteID, subsection._id, sectionId)
    } else {
      setShowConfirmDelete(true)
    }
  }
  const handleHideDeleteConfirmation = () => setShowConfirmDelete(false)

  const handleDrop = async (draggedComponent) => {
    // Find the section and subsection to modify
    const sectionIndex = contentSections.findIndex(
      (sectionFromDb) => sectionFromDb._id === sectionId
    )

    const subsectionIndex = contentSections[sectionIndex].subsections.findIndex(
      (subsectionFromDb) => subsectionFromDb._id === subsection._id
    )

    //removing the id from the dropped component
    const { _id, ...droppedComponent } = draggedComponent

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
          {subsection.components.map((component) => {
            let compProps = {
              key: component._id,
              component: component,
              showSettings: handleShowSettingsSidebar,
            }

            switch (component.category) {
              case 'landing-page':
                return <Hero {...compProps} />
              case 'pricing':
                return <Pricing {...compProps} />
              default:
                return <Component {...compProps} />
            }
          })}
        </>
      ) : (
        <div className='empty-section'>
          <p>You can drop an item here</p>
        </div>
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
            Don't show this again
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
