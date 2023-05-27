import React, { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Canvas from '../../components/Canvas/Canvas'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Loading from '../../components/Loading/Loading'
import "./PublicView.css";


const PublicView = () => {
  const {
    UpdateStatistics,
    premiumPlan,
    website,
    fetchOneWebsite,
    setPublicView,
    menu,
    setMenu,
  } = useContext(CanvasContext)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [locationName, setLocationName] = useState(null)
  const [loading , setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    fetchOneWebsite(id).then(() => setLoading(false))
    setPublicView(true)

    console.log(premiumPlan)
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

      
      {website && website.name && website.isPublished  ? (
        <>
          {!premiumPlan && <NavigationBar />}
          <Canvas
            website={website}
            setMenu={setMenu}
            menu={menu}
          />
        </>
      ) : (
        <>
   {loading ? (
    <div className='loading-container'> 
  <Loading/>
  </div> 
   ):(
    <NotFoundPage/>

   )}
        
        </>
      )}

      <div></div>
    </div>
  )
}

export default PublicView
