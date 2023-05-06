import './Section.css'
import { useContext, useState } from 'react'
import Subsection from './SubSection'
import Loading from '../Loading/Loading'
import { CanvasContext } from '../../context/canvas.context'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const Section = ({ section }) => {
  const {
    webSiteID,
    saveChanges,
    contentSections,
    setContentSections,
    deleteSubsection,
  } = useContext(CanvasContext)

  const [showButtons, setShowButtons] = useState(false)
  const showButtonOptions = () => setShowButtons(true)
  const hideButtonOptions = () => setShowButtons(false)

  const [isResizing, setIsResizing] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)

  const handleSplitSections = async (numberOfSubsectionsClicked) => {
    const subsectionsIncrease =
      numberOfSubsectionsClicked - section.numberOfColumns
    const sectionIndex = contentSections.findIndex(
      (sectionToFind) => sectionToFind.name === section.name
    )

    saveChanges(webSiteID, {
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
  }

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaY = e.pageY - startY

      if (deltaY > 0) {
        const newHeight = startHeight + deltaY
        const sectionElement = e.target.closest('.section')
        sectionElement.style.height = `${newHeight}px`
      }
    }
  }

  const handleMouseUp = (e) => {
    console.log('mouse up')
    setIsResizing(false)
  }

  const handleDeleteSubsection = (webSiteID, subsectionId, sectionId) => {
    if (section.subsections.length !== 1) {
      deleteSubsection(webSiteID, subsectionId, sectionId).then(
        (updatedWebsite) => {
          setContentSections(updatedWebsite.sections)
        }
      )
    } else {
      console.log(
        'you need to keep at least one subsection, delete the whole section instead'
      )
    }
  }
  const style = {}
  return (
    <div
      style={style}
      className='section'
      onMouseEnter={showButtonOptions}
      onMouseLeave={hideButtonOptions}
    >
      {showButtons && (
        <ButtonToolbar
          className='button-wrapper'
          aria-label='Toolbar with button groups'
        >
          <ButtonGroup aria-label='button-group'>
            <Button
              variant={section.numberOfColumns === 1 ? 'dark' : 'outline-dark'}
              onClick={() => handleSplitSections(1)}
            >
              1
            </Button>
            <Button
              variant={section.numberOfColumns === 2 ? 'dark' : 'outline-dark'}
              onClick={() => handleSplitSections(2)}
            >
              2
            </Button>
            <Button
              variant={section.numberOfColumns === 3 ? 'dark' : 'outline-dark'}
              onClick={() => handleSplitSections(3)}
            >
              3
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
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
              />
            )
          })
        ) : (
          <Loading />
        )}
      </div>
      <>
        <div
          className='resize-handle'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </>
    </div>
  )
}

export default Section
