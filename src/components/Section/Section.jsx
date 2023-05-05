import './Section.css'
import { useContext, useEffect, useState } from 'react'
import Subsection from './SubSection'
import Loading from '../Loading/Loading'
import { CanvasContext } from '../../context/canvas.context'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const Section = ({ section }) => {
  const [numberOfColumns, setNumberOfColumns] = useState(
    section.numberOfColumns
  )

  const { webSiteID, saveChanges, contentSections, setContentSections } =
    useContext(CanvasContext)

  const [showButtons, setShowButtons] = useState(false)
  const showButtonOptions = () => setShowButtons(true)
  const hideButtonOptions = () => setShowButtons(false)

  const handleSplitSections = async (numberOfSubsectionsClicked) => {
    const subsectionsIncrease = numberOfSubsectionsClicked - numberOfColumns
    const sectionIndex = contentSections.findIndex(
      (sectionToFind) => sectionToFind.name === section.name
    )

    saveChanges(webSiteID, {
      subsectionsIncrease: subsectionsIncrease,
      sectionIndex: sectionIndex,
    })
      .then((updatedContent) => {
        setContentSections(updatedContent.sections)

        setNumberOfColumns(
          (prevValue) => updatedContent.sections[sectionIndex].numberOfColumns
        )
      })
      .catch((err) => console.log(err))
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
              variant={numberOfColumns === 1 ? 'dark' : 'outline-dark'}
              onClick={() => handleSplitSections(1)}
            >
              1
            </Button>
            <Button
              variant={numberOfColumns === 2 ? 'dark' : 'outline-dark'}
              onClick={() => handleSplitSections(2)}
            >
              2
            </Button>
            <Button
              variant={numberOfColumns === 3 ? 'dark' : 'outline-dark'}
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
              />
            )
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Section
