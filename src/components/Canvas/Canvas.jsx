import BodyDropZone from '../BodyDropZone/BodyDropZone'
import FooterDropZone from '../FooterDropZone/FooterDropZone'
import NavBarDropZone from '../NavBarDropZone/NavBarDropZone'
import './Canvas.css'
const Canvas = () => {
  return (
    <div className='canvas'>
      <NavBarDropZone />
      <BodyDropZone />
      <FooterDropZone />
    </div>
  )
}

export default Canvas
