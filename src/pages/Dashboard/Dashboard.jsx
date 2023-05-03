import { Link } from 'react-router-dom'
import './Dashboard.css'
import { useContext, useEffect } from 'react';
import { CanvasContext } from '../../context/canvas.context';
import canvasStoreService from '../../services/canvas-store.service';


function Dashboard() {
const {webSites, fetchAllWebsites} = useContext(CanvasContext)

useEffect(() => {
  fetchAllWebsites()
}, [])
  return (
      <div>
        {/* Later Add all the graphs and stats of all the websitres the user has created already */}
        <Link to={'/websites'}>Create a new website</Link>
        Websites
        <ul> 
        {webSites.length > 0 && 
        webSites.map(element =>  {
          return( 
            <li key={element._id}>  <Link to={`/websites/edit/${element._id}`}> {element.name} </Link> </li>
          )
        })
        
        }
        </ul>
      </div>
   
  )
}

export default Dashboard
