import React from 'react'
import { useState } from 'react'
import canvasStoreService from '../../services/canvas-store.service'
import { useNavigate } from 'react-router-dom'
const Createform = () => {
  const [siteData, setSiteData] = useState({ name: '', category: '' })
  const { name, category } = siteData
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSiteData((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    canvasStoreService.createWebSite(siteData).then((res) => {
      navigate(`/websites/edit/${res.data._id}`)
    })
  }

  return (
    <div>
      <h3>Create new Website!</h3>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={handleChange}
        />

        <label> Category: </label>
        <input
          type='text'
          name='category'
          value={category}
          onChange={handleChange}
        />

        <button type='submit'>Create new Website</button>
      </form>
    </div>
  )
}

export default Createform
