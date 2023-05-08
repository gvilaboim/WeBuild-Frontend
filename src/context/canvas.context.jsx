import React, { useContext, useState } from 'react'

import canvasStoreService from '../services/canvas-store.service'
import { AuthContext } from './auth.context'

const CanvasContext = React.createContext()

function CanvasProviderWrapper(props) {
  //DashBoard Websites created by user
  const [webSites, setWebSites] = useState([])
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  //components that the user can drag to the canvas
  const [storeComponents, setStoreComponents] = useState([])

  // components rendered in the canvas
  const [navbarComponents, setNavbarComponents] = useState([])
  const [contentSections, setContentSections] = useState([])
  const [footerComponents, setFooterComponents] = useState([])
  const [selectedComponent, setSelectedComponent] = useState({})

  const [userInfo, setUserInfo] = useState([])
  const [userPlan, setUserPlan] = useState({})

  const [webSiteID, setWebSiteID] = useState()

  const [showSettingsSidebar, setShowSettingsSidebar] = useState(false)

  // Helps have hrefs, forms etc to be active on one click
  const [isSiteLive, setIsSiteLive] = useState(false)

  const [showHints, setShowHints] = useState(false)
  const toggleHints = () => setShowHints((previousValue) => !previousValue)
  const saveChanges = async (id, siteData) => {
    try {
      const response = await canvasStoreService.saveChanges(id, siteData)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  const deleteSubsection = async (websiteId, subsectionId, sectionId) => {
    try {
      const response = await canvasStoreService.removeSubsection(
        websiteId,
        subsectionId,
        sectionId
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  const deleteSection = async (websiteId, sectionId) => {
    try {
      const response = await canvasStoreService.removeSection(
        websiteId,
        sectionId
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const getComponentInfo = (component) => {
    setSelectedComponent(component)
    console.log(component)
    return component
  }

  const fetchAllWebsites = () => {
    canvasStoreService
      .getAllWebsites()
      .then((response) => {
        setWebSites(response.data)
      })
      .catch((err) => console.log(err))
  }

  const fetchStoreItems = () => {
    canvasStoreService
      .getStoreItems()
      .then((response) => {
        setStoreComponents(response.data)
      })
      .catch((err) => console.log(err))
  }

  const fetchOneWebsite = (websiteId) => {
    canvasStoreService
      .getOneWebsite(websiteId)
      .then((response) => {
        setNavbarComponents(response.data.navbar)
        setContentSections(response.data.sections)
        setFooterComponents(response.data.footer)
      })
      .catch((err) => console.log(err))
  }

  const fetchUserInfo = (id) => {
    console.log("HERE")
    console.log(id)
 
    canvasStoreService.userInfo(id)
      .then((response) => {
      
        setUserPlan(response.data.plan)
      })
      .catch((err) => console.log(err))
  }


  const updatePlan = (sessionId) => {
    console.log("updatePlan ID", sessionId)
    canvasStoreService.updatePlanFunction(sessionId).then(res => {
      console.log(res.data)
      fetchUserInfo(user._id)
    })
  };

  return (
    <CanvasContext.Provider
      value={{
        storeComponents,

        navbarComponents,
        setNavbarComponents,

        footerComponents,
        setFooterComponents,

        contentSections,
        setContentSections,

        webSites,
        setWebSites,
        webSiteID,
        setWebSiteID,

        fetchAllWebsites,
        fetchStoreItems,
        fetchOneWebsite,
        getComponentInfo,
        saveChanges,

        selectedComponent,
        setSelectedComponent,

        isSiteLive,
        setIsSiteLive,

        showSettingsSidebar,
        setShowSettingsSidebar,

        deleteSubsection,
        deleteSection,

        showHints,
        toggleHints,
        fetchUserInfo,
        userInfo,
        userPlan,
        updatePlan
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  )
}

export { CanvasProviderWrapper, CanvasContext }
