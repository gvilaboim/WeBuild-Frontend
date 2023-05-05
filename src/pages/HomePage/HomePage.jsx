import Button from 'react-bootstrap/Button'
import './HomePage.css'

function HomePage() {
  return (
    <div
      className='home-page'
      style={{ backgroundImage: `url('./landing.jpg')` }}
    >
      <h1 className='home-page-cta'>WEBUILD</h1>
    </div>
  )
}

export default HomePage
