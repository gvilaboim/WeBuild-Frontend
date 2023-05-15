import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'
import PublicSection from './PublicSection'
import Canvas from '../../components/Canvas/Canvas'

const PulicView = () => {
  let { username, sitename } = useParams()
  const { loadPublicView, setPublicView, publicView } =
    useContext(CanvasContext)
  let [website, setWebsite] = useState({})

  useEffect(() => {
    loadPublicView(username, sitename)
      .then((foundWebsite) => {
        setWebsite(foundWebsite)
        setPublicView(true)
      })
      .catch((err) => console.log(err))
  }, [username, sitename])

  return (
    <div>
      {website && website.name ? (
        <>
          <Canvas website={website} />
        </>
      ) : (
        <h1>Website not found</h1>
      )}
    </div>
  )
}

export default PulicView
