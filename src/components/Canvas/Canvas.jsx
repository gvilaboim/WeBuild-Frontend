import { useContext, useEffect } from 'react'
import FooterDropZone from '../FooterDropZone/FooterDropZone'
import NavBarDropZone from '../NavBarDropZone/NavBarDropZone'
import Section from '../Section/Section'
import './Canvas.css'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
const Canvas = () => {
  const { contentSections, publishWebsite, websiteInfo, fetchOneWebsite } =
    useContext(CanvasContext)
  const { user } = useContext(AuthContext)
  const { id } = useParams()

  const navigate = useNavigate()

  const handlePublishWebsite = async (websiteId) => {
    const publishedWebsite = await publishWebsite(websiteId)
  }

  useEffect(() => {
    fetchOneWebsite(id)
    // get website data to render
    console.log(websiteInfo)
  }, [id])

  return (
    <div className='canvas'>
      <Button
        onClick={() => handlePublishWebsite(id)}
        variant='success'
      >
        Publish
      </Button>
      <Button
        onClick={() => navigate(`/webuild/${user.name}/${websiteInfo.name}`)}
        variant='info'
      >
        Go to Website
      </Button>
      <NavBarDropZone />
      <div className='website-body'>
        {contentSections.length === 0 ? (
          <Loading />
        ) : (
          contentSections.map((section) => {
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
