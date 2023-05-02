import { useState } from 'react'
import BodyDropZone from '../BodyDropZone/BodyDropZone'
import FooterDropZone from '../FooterDropZone/FooterDropZone'
import NavBarDropZone from '../NavBarDropZone/NavBarDropZone'
import Section from '../Section/Section'
import './Canvas.css'
const Canvas = () => {

  const [sections, setSections] = useState([<Section />, <Section />, <Section />])
  return (
    <div className='canvas'>
      <NavBarDropZone />
      {/* <BodyDropZone /> */}
      {sections.map((section, index) => section)}
      <FooterDropZone />
    </div>
  )
}

export default Canvas
