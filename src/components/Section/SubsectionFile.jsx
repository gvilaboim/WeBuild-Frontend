import React, { useContext, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import Component from '../Component/Component'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger'
import Tooltip from 'react-bootstrap/esm/Tooltip'
import Pricing from '../Bootstrap/Pricing'
import Hero from '../Bootstrap/Hero'
import FeaturesA from '../Bootstrap/FeaturesA'
import FeaturesB from '../Bootstrap/FeaturesB'
import ImageRight from '../Bootstrap/ImageRight'
import ImageLeft from '../Bootstrap/ImageLeft'
import { useParams } from 'react-router-dom'

const Subsection = ({
  sectionId,
  subsection,
  handleDeleteSubsection,
  toggleHints,
  showToast,
}) => {
  const {
    website,
    setWebsite,
    saveChanges,
    setShowSettingsSidebar,
    setSelectedComponent,
    publicView,
    setMenu,
    menu
  } = useContext(CanvasContext)


  const { id } = useParams()


  const handleShowSettingsSidebar = (componentToEdit) => {
    console.log("teste ma g")
    if (!publicView) {
      setSelectedComponent(componentToEdit)
      setShowSettingsSidebar(true)
    }
  }

  const [showComponentBtns, setShowComponentBtns] = useState(false)
  const handleShowBtns = () => setShowComponentBtns(true)
  const handleHideBtns = () => setShowComponentBtns(false)

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const handleShowDeleteConfirmation = () => {
    // user tries to delete a subsection
    // check if it is the last one
    // and has content and shows a confirmation message

    if (
      website.pages[menu].sections.length === 2 ||
      (subsection.length !== 1 && subsection.components.length === 0)
    ) {
      handleDeleteSubsection(id, subsection._id, sectionId , menu)
    } else {
      setShowConfirmDelete(true)
    }
  }
  const handleHideDeleteConfirmation = () => setShowConfirmDelete(false)

  const handleDrop = async (draggedComponent) => {
    // Find the section and subsection to modify
  
  

    const sectionIndex = website.pages[menu].sections.findIndex(
      (sectionFromDb) => sectionFromDb._id === sectionId
    )

    const subsectionIndex = website.pages[menu].sections[
      sectionIndex
    ].subsections.findIndex(
      (subsectionFromDb) => subsectionFromDb._id === subsection._id
    )

    //removing the id from the dropped component // Page 1 | Page 2 | Page 3 
    const { _id, ...droppedComponent } = draggedComponent
    
    console.log(droppedComponent.items[0])
    saveChanges(id, {
      menu:menu,
      droppedComponent,
      sectionIndex,
      subsectionIndex,
    }).then((updatedContent) => {
      setWebsite(updatedContent)
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

  const style = publicView ? {} : { border: '1px dashed black' }
  if (!subsection) {
    return null; // Return null or handle the empty state accordingly
  }
  return (
    <div
      key={sectionId}
      ref={drop}
      style={{ ...style, backgroundColor }}
      className='sub-section py-5'
      onMouseLeave={handleHideBtns}
      onMouseEnter={handleShowBtns}
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
              case 'hero':
                return <Hero {...compProps} />
              case 'pricing':
                return <Pricing {...compProps} />

              case 'featuresA':
                return <FeaturesA {...compProps} />
              case 'featuresB':
                return <FeaturesB {...compProps} />
              case 'imageRight':
                return <ImageRight {...compProps} />
              case 'imageLeft':
                return <ImageLeft {...compProps} />
              default:
                return <Component {...compProps} />
            }
          })}
        </>
      ) : (
        <>
          {!publicView && (
            <div className='empty-section'>
              <p>You can drop an item here</p>
            </div>
          )}
        </>
      )}

      {showComponentBtns && (
        <>
          {!publicView && (
            <div className='component-buttons'>
              {showToast ? (
                <OverlayTrigger
                  key={'right'}
                  placement={'right'}
                  overlay={
                    <Tooltip>You should not have less than 2 Sections.</Tooltip>
                  }
                >
                  <Button
                    variant='dark'
                    onClick={handleShowDeleteConfirmation}
                  >
                    X
                  </Button>
                </OverlayTrigger>
              ) : (
                <>
                  <Button
                    variant='dark'
                    onClick={handleShowDeleteConfirmation}
                  >
                    X
                  </Button>
                </>
              )}
            </div>
          )}
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
              handleDeleteSubsection(id, subsection._id, sectionId , menu)
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
