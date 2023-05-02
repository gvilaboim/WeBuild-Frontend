import React, { useState, useEffect } from 'react'

import canvasStoreService from '../services/canvas-store.service'

const CanvasContext = React.createContext()

function CanvasProviderWrapper(props) {
  //components that the user can drag to the canvas
  const [storeComponents, setStoreComponents] = useState([])

  //DashBoard Websites created by user
  const [webSites, setWebSites] = useState([])

  // components already dragged to the canvas
  const [navbarComponents, setNavbarComponents] = useState([])
  const [bodyComponents, setBodyComponents] = useState([])
  const [footerComponents, setFooterComponents] = useState([])

  useEffect(() => {
    canvasStoreService.getAllWebsites().then((response) => {
      setWebSites(response.data)
      console.log(response.data)
    })
    canvasStoreService.getStoreItems().then((response) => {
      setStoreComponents(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <CanvasContext.Provider
      value={{
        storeComponents,
        navbarComponents,
        setNavbarComponents,
        bodyComponents,
        setBodyComponents,
        footerComponents,
        setFooterComponents,
        webSites,
        setWebSites,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  )
}

export { CanvasProviderWrapper, CanvasContext }
