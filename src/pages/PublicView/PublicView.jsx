import React, { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Canvas from '../../components/Canvas/Canvas'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PublicView = () => {
  const { UpdateStatistics, website, fetchOneWebsite, setPublicView } =
    useContext(CanvasContext)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [locationName, setLocationName] = useState(null)

  const { id } = useParams()
  useEffect(() => {
    fetchOneWebsite(id)
    setPublicView(true)

    console.log(website)
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude) // Set the longitude state variable
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

      axios
        .get(url)
        .then((response) => {
          setLocationName(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (locationName && website) {
      const StatisticsObject = {
        _id: website._id,
        location: locationName,
        views: 1,
      }

      UpdateStatistics(StatisticsObject)
    }
  }, [website, locationName])

  return (
    <div>
      {website && website.name ? (
        <>
          <Canvas website={website} />
        </>
      ) : (
        <h1>Website not found</h1>
      )}
      <div></div>
    </div>
  )
}

export default PublicView
