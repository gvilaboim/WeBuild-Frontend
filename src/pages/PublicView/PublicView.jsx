import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CanvasContext } from '../../context/canvas.context';

const PulicView = () => {
    let { username, sitename } = useParams();
    const { LoadPublicView } = useContext(CanvasContext)
    let [ website , SetWebsite ] = useState({})

    useEffect(() => {
      const loadWebsite = async () => {
        try {
          const loadedWebsite = await LoadPublicView(username, sitename);
          SetWebsite(loadedWebsite);
        } catch (error) {
          console.log(error);
        }
      };
      loadWebsite();
    }, [username, sitename, LoadPublicView, SetWebsite]);

  return (
    <div>
    {website && website.name ? (
      <h1>Website found</h1>
    ) : (
      <h1>Website not found</h1>
    )}
  </div>

  )
}

export default PulicView