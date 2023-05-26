import React, { useContext, useEffect, useState } from 'react'

import canvasStoreService from '../services/canvas-store.service'
import { AuthContext } from './auth.context'

const CanvasContext = React.createContext()

function CanvasProviderWrapper(props) {
  const { user } = useContext(AuthContext)

  //components that the user can drag to the canvas
  const [storeComponents, setStoreComponents] = useState([])

  // Left Menu
  const [showMenu, setShowMenu] = useState(true)
  // clicked on the left menu to display stats in the dashboard
  const [clickedWebsite, setClickedWebsite] = useState(null)

  const [website, setWebsite] = useState({})
  const [publicView, setPublicView] = useState(false)
  const [menu, setMenu] = useState(0)
  const [isSaving, setIsSaving] = useState(false)


  //remove?
  const [userInfo, setUserInfo] = useState({})
  const [userPlan, setUserPlan] = useState({})
  const [premiumPlan, setPremiumPlan] = useState(false)

  //TBD
  const [showHints, setShowHints] = useState(true)
  const toggleHints = () => setShowHints((previousValue) => !previousValue)

  //what is sent to the sidebar when the user clicks any component
  const [selectedComponent, setSelectedComponent] = useState({})
  const [showSettingsSidebar, setShowSettingsSidebar] = useState(false)

  const ChangeMenu = async (name) => {
    setMenu(name)
    console.log(menu)
  }

  //populates the sidebar
  const fetchStoreItems = () => {
    canvasStoreService
      .getStoreItems()
      .then((response) => {
        setStoreComponents(response.data)
      })
      .catch((err) => console.log(err))
  }

  //returns the whole website obj to render
  // works for public or private views
  const fetchOneWebsite = async (websiteId) => {
    const response = await canvasStoreService.getOneWebsite(websiteId)
    setWebsite(response.data)
  }

  const publishWebsite = async (websiteId) => {
    try {
      const response = await canvasStoreService.publishSite(websiteId)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  // used for every component update, also for right sidebar
  // returns the whole website
  const saveChanges = async (id, siteData) => {
    try {
      const response = await canvasStoreService.saveChanges(id, siteData)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSubsection = async (websiteId, subsectionId, sectionId, menu) => {
    try {
      const response = await canvasStoreService.removeSubsection(
        websiteId,
        subsectionId,
        sectionId,
        menu
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSection = async (websiteId, sectionId, menu) => {
    try {
      const response = await canvasStoreService.removeSection(
        websiteId,
        sectionId,
        menu
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const addASection = async (websiteId, sectionId, menu) => {
    try {
      const response = await canvasStoreService.addSection(
        websiteId,
        sectionId,
        menu
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  // fetch community websites rendered in the dashboard
  const [communityWebsites, setCommunityWebsites] = useState([])
  const fetchCommunityWebsites = async () => {
    const foundCommunityWebsites =
      await canvasStoreService.getCommunityWebsites()
    setCommunityWebsites(foundCommunityWebsites.data)
  }

  // fetch user websites rendered in the dashboard
  const [userWebsites, setUserWebsites] = useState([])
  const fetchUserWebsites = async (id) => {
    const foundUserWebsites = await canvasStoreService.getUserWebsites(id)
    setUserWebsites(foundUserWebsites.data)
  }

  const fetchUserInfo = (id) => {
    canvasStoreService
      .userInfo(id)
      .then((response) => {
        setUserInfo(response.data)
        setUserPlan(response.data.plan)

        if (
          response.data.plan.name === 'Standard' ||
          response.data.plan.name === 'Advanced'
        ) {
          setPremiumPlan(true)
        }
      })
      .catch((err) => console.log(err))
  }

  // Stripe/Pricing Plans
  const updatePlan = (sessionId) => {
    if(sessionId){
    console.log('updatePlan ID', sessionId)
    canvasStoreService.updatePlanFunction(sessionId).then((res) => {
      fetchUserInfo(user._id)
    })
  }
  }

  const UpdateUserInfo = async (userInfo) => {
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

    try {
      const response = await canvasStoreService.getStats(id)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (user) {
      fetchUserInfo(user._id)
    }
  }, [user])


  return (
    <CanvasContext.Provider
      value={{
        storeComponents,

        showMenu,
        setShowMenu,

        website,
        setWebsite,

        communityWebsites,
        setCommunityWebsites,
        userWebsites,
        setUserWebsites,
        clickedWebsite,
        setClickedWebsite,
        fetchUserWebsites,
        fetchCommunityWebsites,
        fetchStoreItems,
        fetchOneWebsite,

        saveChanges,

        selectedComponent,
        setSelectedComponent,

        showSettingsSidebar,
        setShowSettingsSidebar,

        deleteSubsection,
        deleteSection,

        addASection,

        publishWebsite,
        publicView,
        setPublicView,

        showHints,
        toggleHints,

        fetchUserInfo,
        userInfo,
        userPlan,
        updatePlan,

        UpdateUserInfo,
        setUserInfo,

        UpdateStatistics,
        getStatistics,
        setMenu,
        menu,
        ChangeMenu,
        premiumPlan,
        setPremiumPlan,
        setIsSaving,
        isSaving
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  )
}

export { CanvasProviderWrapper, CanvasContext }
