import { useContext, useEffect, useState } from 'react'
import FooterDropZone from '../FooterDropZone/FooterDropZone'
import NavBarDropZone from '../NavBarDropZone/NavBarDropZone'
import Section from '../Section/Section'
import './Canvas.css'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'

const Canvas = ({  setMenu , page, website }) => {
  const { publishWebsite, publicView, setWebsite ,menu} = useContext(CanvasContext)
  const { user } = useContext(AuthContext)
  const { id } = useParams()

  const navigate = useNavigate()

  const handlePublishWebsite = async (websiteId) => {
    publishWebsite(websiteId).then((publishedWebsite) =>
      setWebsite(publishedWebsite)
    )
  }


  

  const style = publicView
    ? { margin: '0%' }
    : { border: '1px solid black', margin: '6% 23%' }

  return (
    <div
      style={style}
      className='canvas'
    >
      {!website && <Loading />}

      {!publicView && website && (
        <div className='p-2'>
          {website.isPublished ? (
            <Button variant='warning'>Published</Button>
          ) : (
            <Button
              onClick={() => handlePublishWebsite(id)}
              variant='success'
            >
              Publish
            </Button>
          )}
          <Button
            onClick={() =>
              navigate(`/webuild/${user.name}/${website.name}/${website._id}`)
            }
            variant='dark'
          >
            Go to Website
          </Button>
        </div>
      )}


{website.pages && (
  <>
    <NavBarDropZone setMenu={setMenu}/>
    <div className='website-body'>
      {website.pages[menu].sections && website.pages[menu].sections.length > 0 ? (
        website.pages[menu].sections.map((section) => (
          <Section key={section._id} section={section} />
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
