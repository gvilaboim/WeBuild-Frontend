import React, { useContext, useState } from 'react'

import canvasStoreService from '../services/canvas-store.service'
import { AuthContext } from './auth.context'

const CanvasContext = React.createContext()

function CanvasProviderWrapper(props) {
  //DashBoard Websites created by user
  const [userWebsites, setUserWebsites] = useState([])

  //DashBoard Websites created by the community
  const [communityWebsites, setCommunityWebsites] = useState([])

  const { user } = useContext(AuthContext)

  //components that the user can drag to the canvas
  const [storeComponents, setStoreComponents] = useState([])

  const [webSiteID, setWebSiteID] = useState()
  const [websiteInfo, setWebsiteInfo] = useState({
    name: '',
    category: '',
    id: '',
  })
  const [publicView, setPublicView] = useState(false)

  // components rendered in the canvas
  const [navbarComponents, setNavbarComponents] = useState([])
  const [contentSections, setContentSections] = useState([])
  const [footerComponents, setFooterComponents] = useState([])
  const [selectedComponent, setSelectedComponent] = useState({})

  const [userInfo, setUserInfo] = useState({})
  const [userPlan, setUserPlan] = useState({})

  const [showSettingsSidebar, setShowSettingsSidebar] = useState(false)

  const [showHints, setShowHints] = useState(false)
  const toggleHints = () => setShowHints((previousValue) => !previousValue)

  const publishWebsite = async (websiteId) => {
    try {
      const response = await canvasStoreService.publishSite(websiteId)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

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

  const fetchCommunityWebsites = async () => {
    const foundCommunityWebsites =
      await canvasStoreService.getCommunityWebsites()
    setCommunityWebsites(foundCommunityWebsites.data)
  }
  const fetchUserWebsites = async (id) => {
    const foundUserWebsites = await canvasStoreService.getUserWebsites(id)
    setUserWebsites(foundUserWebsites.data)
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

  const loadPublicView = async (username, sitename) => {
    try {
      const response = await canvasStoreService.getPublicView(
        username,
        sitename
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateUserInfo = async (userInfo) => {
    console.log('UpdateUserInfo Function : ', userInfo)
    try {
      const response = await canvasStoreService.updateUserInfo(userInfo)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateStatistics = async (StatisticsObject) => {

    try {
      const response = await canvasStoreService.updateWebsiteStatistics(
        StatisticsObject
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const getStatistics = async (id) => {
    console.log('StatisticsArray', id)

    try {
      const response = await canvasStoreService.getStats(id)
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

        communityWebsites,
        setCommunityWebsites,

        userWebsites,
        setUserWebsites,

        webSiteID,
        setWebSiteID,
        websiteInfo,
        setWebsiteInfo,

        fetchUserWebsites,
        fetchCommunityWebsites,
        fetchStoreItems,
        fetchOneWebsite,
        getComponentInfo,
        saveChanges,

        selectedComponent,
        setSelectedComponent,

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

        loadPublicView,
        UpdateUserInfo,
        setUserInfo,

        publishWebsite,
        publicView,
        setPublicView,
        UpdateStatistics,
        getStatistics,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  )
}

export { CanvasProviderWrapper, CanvasContext }
