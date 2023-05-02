import axios from 'axios';

class CanvasStoreService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/examples
  createWebSite = async (siteData) => {
    return this.api.post('/api/websites/create', {siteData});
  }

 // GET /api/canvas-store
 getAllWebsites = async () => {
  return this.api.get('/api/websites');
}

  saveChanges = async (siteData) => {
    return this.api.put('/api/websites', {siteData});
  }

 getAllWebsites = async (id) => {
  return this.api.get(`/api/websites/${id}`);
}

  // GET /api/canvas-store
  getAll = async () => {
    return this.api.get('/api/canvas-store');
  }

  // GET /api/examples/:id
  getOne = async (id) => {
    return this.api.get(`/api/examples/${id}`);
  }

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/examples/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/api/examples/${id}`);
  } 





}

// Create one instance of the service
const canvasStoreService = new CanvasStoreService();

export default canvasStoreService;