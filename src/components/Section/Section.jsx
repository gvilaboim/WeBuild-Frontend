import { useState } from 'react'
import SubSection from './SubSection'

const Section = () => {
  const [subSections, setSubSections] = useState([<SubSection />])

  const handleSplitSections = (numberOfSections) => {
    if(subSections.length < numberOfSections){
        setSubSections(previousValue => [...previousValue, <Section />])
    }
  }

  const style = { minHeight: '20%' }

  return (
    <div style={style}>
      <div>
        <button onClick={() => handleSplitSections(1)}>1</button>
        <button onClick={() => handleSplitSections(2)}>2</button>
        <button onClick={() => handleSplitSections(3)}>3</button>
      </div>
      {subSections.map((subSection) => {
        return <SubSection />
      })}
    </div>
  )
}

export default Section
