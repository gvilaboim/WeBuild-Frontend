

import React, { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context';


const Success = () => {
    const { webSites, fetchAllWebsites ,updatePlan, fetchUserInfo, userInfo} = useContext(CanvasContext)

    useEffect(() => {
        const url = window.location.href;
        const sessionId = url.split("=")[1]; // Extract the session ID from the URL
        updatePlan(sessionId); // Call the updatePlan function with the session ID
    }, [])
    
  return (
    <div>Success</div>
  )
}

export default Success

