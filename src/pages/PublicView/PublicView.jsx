import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CanvasContext } from '../../context/canvas.context'
import PublicSection from './PublicSection'
import Canvas from '../../components/Canvas/Canvas'
import axios from 'axios'

const PublicView = () => {
  let { username, sitename } = useParams()
  const { loadPublicView, setPublicView, UpdateStatistics } =
    useContext(CanvasContext)
  let [website, setWebsite] = useState({})
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [locationName, setLocationName] = useState(null)

  useEffect(() => {
    loadPublicView(username, sitename)
      .then((foundWebsite) => {
        setWebsite(foundWebsite)
        setPublicView(true)
      })
      .catch((err) => console.log(err))
  }, [username, sitename])

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
