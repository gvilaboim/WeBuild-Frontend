import './Section.css'
import { useContext, useState } from 'react'
import Subsection from './Subsection'
import Loading from '../Loading/Loading'
import { CanvasContext } from '../../context/canvas.context'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useParams } from 'react-router-dom'

const Section = ({ section }) => {
  const {
    
    saveChanges,
    contentSections,
    setContentSections,
    deleteSubsection,
    deleteSection,
    addASection,
    publicView,
  } = useContext(CanvasContext)

  const {id} = useParams()

  const [showButtons, setShowButtons] = useState(false)
  const showButtonOptions = () => setShowButtons(true)
  const hideButtonOptions = () => setShowButtons(false)

  const [isResizing, setIsResizing] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)

  const [showToast, setShowToast] = useState(false)

  const handleSplitSections = async (numberOfSubsectionsClicked) => {
    const subsectionsIncrease =
      numberOfSubsectionsClicked - section.subsections.length
    const sectionIndex = contentSections.findIndex(
      (sectionToFind) => sectionToFind._id === section._id
    )

    saveChanges(id, {
      subsectionsIncrease: subsectionsIncrease,
      sectionIndex: sectionIndex,
    })
      .then((updatedContent) => {
        setContentSections(updatedContent.sections)
      })
      .catch((err) => console.log(err))
  }

  const handleMouseDown = (e) => {
    setIsResizing(true)
    setStartY(e.pageY)

    setStartHeight(e.target.closest('.section').offsetHeight)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaY = e.pageY - startY

      const newHeight = startHeight + deltaY
      const sectionElement = e.target.closest('.section')
      sectionElement.style.height = `${newHeight}px`
    }
  }

  const handleMouseUp = (e) => {
    setIsResizing(false)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleDeleteSubsection = (id, subsectionId, sectionId) => {
    //if it is the last subSection it will delete the whole section
    if (section.subsections.length !== 1) {
      deleteSubsection(id, subsectionId, sectionId).then(
        (updatedWebsite) => {
          setContentSections(updatedWebsite.sections)
        }
      )
    } else {
      if (contentSections.length > 2) {
        deleteSection(id, sectionId).then((updatedWebsite) =>
          setContentSections(updatedWebsite.sections)
        )
      } else {
        //must have at least 2 sections
        setShowToast(true)
      }
    }
  }

  const handleAddASection = (id, sectionId) => {
    addASection(id, sectionId).then((updatedWebsite) =>
      setContentSections(updatedWebsite.sections)
    )
  }

  const style = {margin: "2%"}
  return (
    <div
      style={style}
      className='section'
      onMouseEnter={showButtonOptions}
      onMouseLeave={hideButtonOptions}
    >
      {!publicView && showButtons && (
        <OverlayTrigger
          key={'left'}
          placement={'left'}
          overlay={<Tooltip>Add more Sections</Tooltip>}
        >
          <ButtonToolbar
            className='button-wrapper'
            aria-label='Toolbar with button groups'
          >
            <ButtonGroup aria-label='button-group'>
              <Button
                variant={
                  section.subsections.length === 1 ? 'dark' : 'outline-dark'
                }
                onClick={() => handleSplitSections(1)}
              >
                1
              </Button>
              <Button
                variant={
                  section.subsections.length === 2 ? 'dark' : 'outline-dark'
                }
                onClick={() => handleSplitSections(2)}
              >
                2
              </Button>
              <Button
                variant={
                  section.subsections.length === 3 ? 'dark' : 'outline-dark'
                }
                onClick={() => handleSplitSections(3)}
              >
                3
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </OverlayTrigger>
      )}
      <div className='section-content'>
        {section.subsections.length > 0 ? (
          section.subsections.map((subsection) => {
            return (
              <Subsection
                key={subsection._id}
                sectionName={section.name}
                subsectionName={subsection.name}
                subsection={subsection}
                sectionId={section._id}
                handleDeleteSubsection={handleDeleteSubsection}
                setShowToast={setShowToast}
                showToast={showToast}
              />
            )
          })
        ) : (
          <Loading />
        )}
      </div>
      <>
        {!publicView && (
          <div
            className='resize-handle'
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        )}
      </>
      {!publicView && (

      <Button
        className='add-section-button'
        variant={'dark'}
        onClick={() => handleAddASection(id, section._id)}
      >
        Add a Section
      </Button>
      )}
    </div>
  )
}

export default Section
