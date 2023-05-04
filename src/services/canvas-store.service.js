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
  // GET /api/canvas-store
  getStoreItems = async () => {
    return this.api.get('/api/canvas-store')
  }

  //Add current website changes to DB
  saveChanges = async (id, siteData) => {
    return this.api.put(`/api/websites/${id}`, { siteData })
  }

  //UPDATE COMPONENT INFO

  saveComponentChanges = async (componentData) => {
    return this.api.put(`/api/websites/components/edit/`, { componentData })
  }

  // DASHBOARD
  // GET /api//websites/get-all
  getAllWebsites = async () => {
    return this.api.get('/api/websites/get-all')
  }


  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/api/examples/${id}`)
  }
}

// Create one instance of the service
const canvasStoreService = new CanvasStoreService()

export default canvasStoreService
