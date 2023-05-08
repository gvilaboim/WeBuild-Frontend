import { Link, useParams } from 'react-router-dom'
import './AllPlans.css'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import canvasStoreService from '../../services/canvas-store.service'
import { AuthContext } from '../../context/auth.context'


function SinglePlan() {
  const { webSites, fetchAllWebsites ,updatePlan } = useContext(CanvasContext)
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  const [Plan, setPlan] = useState()
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(Plan)
    console.log(user._id)
    canvasStoreService.checkout(Plan,user._id).then((res) => {
      console.log(res.data)
      const { url } = res.data;
      window.location.href = url;

      })
  }


  useEffect(() => {
    canvasStoreService.getSinglePlan(id).then(response => {
     setPlan(response.data)
    })
  }, [id])

  // Later Add all the graphs and stats of all the websitres the user has created already

  return (
    <>
      <h1>Upgrade Plans</h1>

      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Upgrade Your Features</Card.Title>
            <Card.Text>
              Choose a plan that fulfills your desires
            </Card.Text>
            <Card.Link href='/websites'>Start now!</Card.Link>
          </Card.Body>
        </Card>
        </Container >
       
    <form onSubmit={handleSubmit} > 
    <button type='submit'>Checkout</button>
  </form>
   
    
    </>
  )
}

export default SinglePlan
