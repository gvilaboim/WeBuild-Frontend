import React, { useState, useEffect } from 'react'

import canvasStoreService from '../services/canvas-store.service'

const CanvasContext = React.createContext()

function CanvasProviderWrapper(props) {
  
  //components that the user can drag to the canvas
  const [storeComponents, setStoreComponents] = useState([])
  
  // components already dragged to the canvas
  const [navbarComponents, setNavbarComponents] = useState([])
  const [bodyComponents, setBodyComponents] = useState([])
  const [footerComponents, setFooterComponents] = useState([])
  
  const getStoreComponents = async () => {
    return await canvasStoreService.getAll()
  }
  
  //later will get from DB current website components
  useEffect(() => {
    getStoreComponents().then((res) => setStoreComponents(res.data))
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
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  )
}

export { CanvasProviderWrapper, CanvasContext }
