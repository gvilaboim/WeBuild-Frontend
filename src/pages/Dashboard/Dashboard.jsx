import { Link } from 'react-router-dom'
import './Dashboard.css'


function Dashboard() {
  return (
      <div>
        {/* Later Add all the graphs and stats of all the websitres the user has created already */}
        <Link to={'/create'}>Create a new website</Link>
      </div>
   
  )
}

export default Dashboard
