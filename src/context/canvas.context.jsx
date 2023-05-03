import React, { useState, useEffect, useContext } from 'react'

import canvasStoreService from '../services/canvas-store.service'

const CanvasContext = React.createContext()

function CanvasProviderWrapper(props) {

  //DashBoard Websites created by user
  const [webSites, setWebSites] = useState([])
//fazer Website ID GLOBAL
  
  //components that the user can drag to the canvas
  const [storeComponents, setStoreComponents] = useState([])

  // components rendered in the canvas
  const [navbarComponents, setNavbarComponents] = useState([])
  const [contentSections, setContentSections] = useState([])
  const [footerComponents, setFooterComponents] = useState([])


  const [webSiteID, setWebSiteID] = useState()


  const saveChanges = () => {

    console.log(contentSections)
    let siteData = {
      id:webSiteID,
      navbarComponents,
      contentSections,
      footerComponents,
    }
    canvasStoreService
      .saveChanges(siteData)
      .then((res) => {
        console.log(res.data)
        setContentSections(res.data.sections)
        setNavbarComponents(res.data.navbar)
        setFooterComponents(res.data.footer)
      })
      
  }


  const getComponentInfo = (component) => {
    console.log(component)
  return component
  }


  const fetchAllWebsites = () => {
    canvasStoreService
      .getAllWebsites()
      .then((response) => {
        setWebSites(response.data)
      })
      .catch((err) => console.log('getAllWebsites err'))
  }

  const fetchStoreItems = () => {
    canvasStoreService
      .getStoreItems()
      .then((response) => {
        setStoreComponents(response.data)
      })
      .catch((err) => console.log('getStoreItems err'))
  }

  const fetchOneWebsite = (websiteId) => {
    canvasStoreService
      .getOneWebsite(websiteId)
      .then((response) => {
        setNavbarComponents(response.data.navbar)
        setContentSections(response.data.sections)
        setFooterComponents(response.data.footer)
      })
      .catch((err) => console.log('getOneWebsite err'))
  }

  return (
    <CanvasContext.Provider
      value={{
        storeComponents,
        navbarComponents,
        setNavbarComponents,
        footerComponents,
        setFooterComponents,
        webSites,
        setWebSites,
        contentSections,
        setContentSections,
        fetchAllWebsites,
        fetchStoreItems,
        fetchOneWebsite,
        getComponentInfo,
        setWebSiteID,
        webSiteID,
        saveChanges
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  )
}

export { CanvasProviderWrapper, CanvasContext }
