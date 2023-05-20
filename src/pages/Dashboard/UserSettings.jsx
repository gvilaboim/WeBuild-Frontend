import React, { useContext, useEffect, useState } from 'react'
import canvasStoreService from '../../services/canvas-store.service'
import { AuthContext } from '../../context/auth.context'
import { CanvasContext } from '../../context/canvas.context'

const UserSettings = () => {

 const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
 const { fetchUserInfo , userPlan , userInfo ,setUserInfo, UpdateUserInfo} = useContext(CanvasContext)

  useEffect(() => {
    const loadInfoUser = async () => {
      try {
        const loadedUserInfo = await  fetchUserInfo(user._id)
      } catch (error) {
        console.log(error);
      }
    };
    loadInfoUser();
}, []);


    const handleChange = (e) => {
      setUserInfo((previousValue) => ({
          ...previousValue,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        
        const SaveInfoUser = async (userInfo) => {
          try {
            const loadedUserInfo = await  UpdateUserInfo(userInfo)
        console.log(loadedUserInfo)
         setUserInfo(userInfo)

          } catch (error) {
            console.log(error);
          }
        };
        SaveInfoUser(userInfo);
    }

    
  return (

    <div>
    <h3>User Settings</h3>
    <br/>

    {userInfo &&  <form onSubmit={handleSubmit}>
    
      <label> Name: </label>
      <input
        type='text'
        name='name'
        value={userInfo.name}
        onChange={handleChange}
      />
       <br/>
     <label>Username: </label>
      <input
        type='text'
        name='username'
        value={userInfo.username}
        onChange={handleChange}
      />
             <br/>

    <label>Email: </label>

      <input
        type='text'
        name='email'
        value={userInfo.email}
        onChange={handleChange}
      />
       <br/>

      <button type='submit'>Save Changes</button>
    </form>   }
  </div>
  )
}

export default UserSettings