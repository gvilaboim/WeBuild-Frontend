import axios from 'axios'

class CanvasStoreService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
    })

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }

      return config
    })
  }

  // WEBSITE calls
  // CREATE NEW OR EDIT EXISTING WEBSITE
  // POST /api/websites//create
  createWebSite = async (siteData) => {
    return this.api.post('/api/websites/create', { siteData })
  }

  // Get website from DB - to Edit
  // GET /api/websites/:id
  getOneWebsite = async (id) => {
    return this.api.get(`/api/websites/${id}`)
  }

  // Get website from DB - deployed version
  // GET /api/websites/public/:username/:sitename
  getPublicView = async (username, sitename) => {
    return this.api.get(`/api/websites/public/${username}/${sitename}`)
  }

  // GET /api/canvas-store
  getStoreItems = async () => {
    return this.api.get('/api/canvas-store')
  }

  // EDIT website
  //Add current website changes to DB

  publishSite = async (id) => {
    return this.api.put(`/api/websites/publish/${id}`, {})
  }

  saveChanges = async (id, siteData) => {
    return this.api.put(`/api/websites/${id}`, { siteData })
  }

  removeSubsection = async (websiteId, subsectionId, sectionId) => {
    return this.api.put(`/api/websites/${websiteId}/delete-subsection`, {
      subsectionId,
      sectionId,
    })
  }
  addSection = async (websiteId, sectionId) => {
    return this.api.put(`/api/websites/${websiteId}/add-section`, {
      sectionId,
    })
  }
  removeSection = async (websiteId, sectionId) => {
    return this.api.put(`/api/websites/${websiteId}/delete-section`, {
      sectionId,
    })
  }

  //UPDATE COMPONENT INFO
  saveComponentChanges = async (websiteId, componentData) => {
    return this.api.put(`/api/websites/${websiteId}/components/edit/`, {
      componentData,
    })
  }

  // DASHBOARD
  // GET /api//websites/community
  getCommunityWebsites = async () => {
    return this.api.get('/api/websites/community')
  }

  // GET /api//websites/user/:id
  getUserWebsites = async (id) => {
    return this.api.get(`/api/websites/user/${id}`)
  }

  // DELETE /api/examples/:id

  deleteProject = async (id) => {
    return this.api.delete(`/api/examples/${id}`)
  }

  getAllPlans = async () => {
    return this.api.get('/api/plans/all')
  }
  getSinglePlan = async (id) => {
    return this.api.get(`/api/plans/${id}`)
  }

  updatePlan = async (sessionId) => {
    return this.api.post(`/api/update-user-plan`, { sessionId })
  }

  checkout = async (plan, userInfo) => {
    let details = {
      plan,
      userId: userInfo,
    }
    return this.api.post(`/api/create-checkout-session`, { details })
  }

  updatePlanFunction = async (sessionId) => {
    console.log('HERE UPDATE PLAN sessionId : ', sessionId)

    try {
      const response = await this.api.get(
        `/api/get-payment-details/${sessionId}`
      )
      const paymentDetails = response.data

      const { paymentId, planId, userId } = paymentDetails

      console.log(
        `Payment ${paymentId} succeeded! Updating user ${userId} plan to ${planId}...`
      )

      const updateResponse = await this.api.post(`/api/update-user-plan`, {
        userId,
        planId,
      })
      const data = updateResponse.data

      console.log('User plan updated successfully!', data)

      return data
      // window.location.href = "/dashboard"; // Redirect to the dashboard after the plan is updated
    } catch (error) {
      console.error('Error updating user plan:', error)
    }
  }

  userInfo = async (id) => {
    return this.api.get(`/api/user/${id}`)
  }

  updateUserInfo = async (userInfo) => {
    console.log('store service', userInfo)
    return this.api.put(`/api/settings/${userInfo._id}`, { userInfo })
  }

  updateWebsiteStatistics = async (StatisticsObject) => {
    console.log('store service', StatisticsObject)
    return this.api.put(`/api/dashboard/statistics`, { StatisticsObject })
  }

  getStats = async (id) => {
    return this.api.get(`/api/dashboard/statistics/${id}`)
  }
}

// Create one instance of the service
const canvasStoreService = new CanvasStoreService()

export default canvasStoreService
