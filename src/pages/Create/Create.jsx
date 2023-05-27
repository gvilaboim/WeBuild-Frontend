import './Create.css'

import { useContext, useEffect, useState } from 'react'
import Canvas from '../../components/Canvas/Canvas'

import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { CanvasContext } from '../../context/canvas.context'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { Button, Carousel, Collapse } from 'react-bootstrap'
import { AuthContext } from '../../context/auth.context'
import canvasStoreService from '../../services/canvas-store.service'
import { RiDeleteBinLine } from 'react-icons/ri'

const Create = () => {
  const { fetchOneWebsite, website, publishWebsite, setWebsite } =
    useContext(CanvasContext)
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [openCarousel, setOpenCarousel] = useState(false)

  useEffect(() => {
    fetchOneWebsite(id)
  }, [])

  const handlePublishWebsite = async (websiteId) => {
    publishWebsite(websiteId).then((publishedWebsite) =>
      setWebsite(publishedWebsite)
    )
  }

  const handleDeleteSite = async () => {
    canvasStoreService
      .deleteWebsite(id)
      .then((response) => navigate('/dashboard'))
  }

  const handBackgroundChange = (e) => {
    const { name: ImgSrc } = e.target

    canvasStoreService
      .updateWebsiteBg(website._id, ImgSrc)
      .then((response) => setWebsite(response.data))
  }

  return (
    <div className='create-page'>
      {website && (
        <>
          <div className='p-2 d-flex justify-content-center align-items-center gap-2'>
            {openCarousel && (
              <>
                
              <Button
                  variant='outline-secondary'
                  onClick={() => setOpenCarousel(!openCarousel)}
                  aria-controls='change-bg-container'
                  aria-expanded={openCarousel}
                >
                  Close
                </Button>
            
                {website.background && <Button
                  variant='outline-danger'
                  onClick={handBackgroundChange}
                >
                  Remove Background
                </Button>}

              </>
            )}

            {!openCarousel && (
              <Button
                variant='outline-secondary'
                onClick={() => setOpenCarousel(!openCarousel)}
                aria-controls='change-bg-container'
                aria-expanded={openCarousel}
              >
                Change Background
              </Button>
            )}
            {website.isPublished ? (
              <Button
                onClick={() => handlePublishWebsite(id)}
                variant='secondary'
                className='px-4'
              >
                Unpublish
              </Button>
            ) : (
              <Button
                onClick={() => handlePublishWebsite(id)}
                variant='success'
                className='px-4'
              >
                Publish
              </Button>
            )}

            <Button
              variant='outline-danger'
              className='px-4'
              onClick={handleDeleteSite}
            >
              <RiDeleteBinLine />
            </Button>
            <Button
              href={`/webuild/${user.name}/${website.name}/${website._id}`}
              target='_blank'
              rel='noopener noreferrer'
              variant='dark'
              className='px-4'
            >
              Go to Website
            </Button>
          </div>
          <div>
            <Collapse in={openCarousel}>
              <div id='change-bg-container'>
                <Carousel
                  variant='dark'
                  fade
                >
                  <Carousel.Item>
                    <img
                      src='/bg1.jpg'
                      name='/bg1.jpg'
                      className='website-bg-image'
                      alt='background-option'
                      onClick={handBackgroundChange}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src='/bg2.jpg'
                      className='website-bg-image'
                      alt='background-option'
                      name='/bg2.jpg'
                      onClick={handBackgroundChange}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src='/bg3.jpg'
                      className='website-bg-image'
                      alt='background-option'
                      name='/bg3.jpg'
                      onClick={handBackgroundChange}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src='/bg4.jpg'
                      className='website-bg-image'
                      alt='background-option'
                      name='/bg4.jpg'
                      onClick={handBackgroundChange}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src='/bg5.jpg'
                      className='website-bg-image'
                      alt='background-option'
                      name='/bg5.jpg'
                      onClick={handBackgroundChange}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src='/bg6.jpg'
                      className='website-bg-image'
                      alt='background-option'
                      name='/bg6.jpg'
                      onClick={handBackgroundChange}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
            </Collapse>
          </div>
        </>
      )}
      {website ? <Canvas website={website} /> : <Loading />}

      <RightSideBar />
    </div>
  )
}

export default Create
