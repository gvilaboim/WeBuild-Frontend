import './Section.css'
import { useEffect, useState } from 'react'
import Subsection from './Subsection'
import Loading from '../Loading/Loading'

const Section = ({ section }) => {
  const [subsections, setSubSections] = useState(section.subsections)
  const [numberOfColumns, setNumberOfColumns] = useState(section.numberOfColumns)
  
  useEffect(() => {
    setSubSections(section.subsections);
  }, [section])

  const handleSplitSections = (numberOfSections) => {
    if (subsections.length < numberOfSections) {
      if (subsections.length === numberOfSections - 1) {
        setNumberOfColumns(prevValue => prevValue+1)
        setSubSections((previousValue) => [...previousValue, <Subsection />])
      } else {
        setNumberOfColumns(prevValue => prevValue+2)
        setSubSections((previousValue) => [
          ...previousValue,
          <Subsection />,
          <Subsection />,
        ])
      }
    }
  }

  const style = { minHeight: '20%' }
  return (
    <div
      style={style}
      className='section'
    >
      <div className='button-wrapper'>
        <button onClick={() => handleSplitSections(1)}>1</button>
        <button onClick={() => handleSplitSections(2)}>2</button>
        <button onClick={() => handleSplitSections(3)}>3</button>
        <button>X</button>
        <button>number of subsections: {numberOfColumns}</button>
      </div>
      <div className='section-content'>
        {  subsections.length > 0 ? (
          subsections.map((subsection, index) => {
            console.log(subsection)
            return <Subsection key={subsection._id} sectionName={section.name} subsectionName={subsection.name} subsection={subsection} />
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Section
