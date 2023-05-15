import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'
import PublicSection from './PublicSection'

const PulicView = () => {
  let { username, sitename } = useParams()
  const { loadPublicView } = useContext(CanvasContext)
  let [website, setWebsite] = useState({})

  useEffect(() => {
    loadPublicView(username, sitename)
      .then((foundWebsite) => {
        setWebsite(foundWebsite)
      })
      .catch((err) => console.log(err))
  }, [username, sitename])

  return (
    <div>
      {website && website.name ? (
        <>
          {website.sections.length > 0 &&
            website.sections.map((section) => 
              {
                console.log(section)
                return <PublicSection
                key={section._id}
                section={section}
              />}
            )}
        </>
      ) : (
        <h1>Website not found</h1>
      )}
    </div>
  )
}

export default PulicView
