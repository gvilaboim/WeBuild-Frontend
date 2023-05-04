import { useContext, useEffect } from 'react'
import FooterDropZone from '../FooterDropZone/FooterDropZone'
import NavBarDropZone from '../NavBarDropZone/NavBarDropZone'
import Section from '../Section/Section'
import './Canvas.css'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'
const Canvas = () => {
  const { contentSections } = useContext(CanvasContext)

  useEffect(() => {
    
  console.log('contentSections updated')
    
  }, [contentSections])
  
  return (
    <div className='canvas'>
      <NavBarDropZone />
      <div className='website-body'>
        {contentSections.length === 0 ? (
          <Loading />
        ) : (
          contentSections.map((section) => {
            console.log(section.numberOfColumns)
            return (
              <Section
                key={section._id}
                section={section}
              />
            )
          })
        )}
      </div>

      <FooterDropZone />
    </div>
  )
}

export default Canvas
