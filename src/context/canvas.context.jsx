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

  const [webSiteID, setWebSiteID] = useState()
  const [websiteInfo, setWebsiteInfo] = useState({ name: '', category: '' })

  // components rendered in the canvas
  const [navbarComponents, setNavbarComponents] = useState([])
  const [contentSections, setContentSections] = useState([])
  const [footerComponents, setFooterComponents] = useState([])
  const [selectedComponent, setSelectedComponent] = useState({})
  const [websiteBg, setWebsiteBg] = useState('')

  const [userInfo, setUserInfo] = useState({})
  const [userPlan, setUserPlan] = useState({})

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

  const addASection = async (websiteId, sectionId) => {
    try {
      const response = await canvasStoreService.addSection(websiteId, sectionId)
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
        setWebsiteInfo({
          name: response.data.name,
          category: response.data.category,
        })
        setNavbarComponents(response.data.navbar)
        setContentSections(response.data.sections)
        setFooterComponents(response.data.footer)
      })
      .catch((err) => console.log(err))
  }

  const fetchUserInfo = (id) => {
    canvasStoreService
      .userInfo(id)
      .then((response) => {
        setUserInfo(response.data)
        setUserPlan(response.data.plan)
      })
      .catch((err) => console.log(err))
  }

  const updatePlan = (sessionId) => {
    console.log('updatePlan ID', sessionId)
    canvasStoreService.updatePlanFunction(sessionId).then((res) => {
      console.log(res.data)
      fetchUserInfo(user._id)
    })
  }

  const LoadPublicView =  async (username, sitename) => {
    console.log("LoadPublicView Function : ", username ,sitename )
    try {
    const response =  await canvasStoreService.getPublicView(username, sitename)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }

  }

 
  const UpdateUserInfo =  async (userInfo) => {
    console.log("UpdateUserInfo Function : ",userInfo )
    try {
    const response =  await canvasStoreService.updateUserInfo(userInfo)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }

  }


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
        websiteInfo,
        setWebsiteInfo,

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

        addASection,

        showHints,
        toggleHints,

        fetchUserInfo,
        userInfo,
        userPlan,
        updatePlan,

        LoadPublicView,
        UpdateUserInfo,
        setUserInfo
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  )
}

export { CanvasProviderWrapper, CanvasContext }
