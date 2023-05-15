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

const Canvas = ({ website }) => {
  const { contentSections, publishWebsite, websiteInfo, fetchOneWebsite, publicView } =
    useContext(CanvasContext)
  const { user } = useContext(AuthContext)
  const { id } = useParams()

  const navigate = useNavigate()

  const handlePublishWebsite = async (websiteId) => {
    const publishedWebsite = await publishWebsite(websiteId)
  }

  useEffect(() => {
    if (!publicView) {
      fetchOneWebsite(id)
    } else{
      // id is not part of params in public view
      fetchOneWebsite(website._id)
    }

    // get website data to render
  }, [id])

  const style = publicView
    ? {margin: '0%'}
    : { border: '1px solid black', margin: '6% 23%' }

  return (
    <div
      style={style}
      className='canvas'
    >
      {!publicView && (
        <>
          <Button
            onClick={() => handlePublishWebsite(id)}
            variant='success'
          >
            Publish
          </Button>
          <Button
            onClick={() =>
              navigate(`/webuild/${user.name}/${websiteInfo.name}`)
            }
            variant='info'
          >
            Go to Website
          </Button>
        </>
      )}

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
