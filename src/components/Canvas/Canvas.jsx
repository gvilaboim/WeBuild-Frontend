import { useContext } from 'react'
import FooterDropZone from '../FooterDropZone/FooterDropZone'
import NavBarDropZone from '../NavBarDropZone/NavBarDropZone'
import Section from '../Section/Section'
import './Canvas.css'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'

const Canvas = ({ setMenu, website }) => {
  const { publicView, menu } = useContext(CanvasContext)

  const style = { margin: publicView ? '0%' : '2%' }
  
  return (
    <div
      style={{
        ...style,
        background: `no-repeat center/cover url(${website.background}) `,
      }}
      className='canvas'
    >
      {!website && <Loading />}

      {website.pages && (
        <>
          <NavBarDropZone setMenu={setMenu} />
          <div className='website-body'>
            {website.pages[menu].sections &&
            website.pages[menu].sections.length > 0 ? (
              website.pages[menu].sections.map((section, index) => (
                <Section
                  key={index}
                  section={section}
                />
              ))
            ) : (
              <p>No sections found.</p>
            )}
          </div>
          <FooterDropZone />
        </>
      )}
    </div>
  )
}

export default Canvas
