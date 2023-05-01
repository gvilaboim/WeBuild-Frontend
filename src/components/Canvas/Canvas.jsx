import BodyDropZone from '../BodyDropZone/BodyDropZone'
import FlexDropZone from '../FlexDropZone/FlexDropZone'
import FooterDropZone from '../FooterDropZone/FooterDropZone'
import NavBarDropZone from '../NavBarDropZone/NavBarDropZone'
import './Canvas.css'
const Canvas = () => {
  return (
    <div className='canvas'>
      <NavBarDropZone />
      <FlexDropZone />
      {/* <BodyDropZone /> */}
      <FooterDropZone />
    </div>
  )
}

export default Canvas
