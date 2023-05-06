import { Link, useParams } from 'react-router-dom'
import './AllPlans.css'
import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import canvasStoreService from '../../services/canvas-store.service'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCheckbox,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBRadio,
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem,
  } from "mdb-react-ui-kit";

function SinglePlan() {
  const { webSites, fetchAllWebsites } = useContext(CanvasContext)
  const [Plan, setPlan] = useState()
  const { id } = useParams();
  const [details, setDetails] = useState({ postalcode: '1495-020', name: 'Jonny Honas' , cardnumber: '9819281928'  , date: '20/2/2023' , cvv: '123' , expiration: '20/2/2024'})


  const handleChange = (e) => {
    setDetails((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(details)
  
    canvasStoreService.checkout(details).then((res) => {
        console.log(res)
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

        <Row>
            
  
        </Row>
      </Container >
      <form onSubmit={handleSubmit} > 
      <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <h5 className="mb-0">Biling details</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput label="First name" id="form1" type="text" />
                </MDBCol>

                <MDBCol>
                  <MDBInput label="Last name" id="form2" type="text" />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Address"
                id="form3"
                type="text"
                name="adress"
               
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form4"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Phone"
                id="form5"
                type="number"
              />

              <hr className="my-4" />

              <MDBCheckbox
                name="flexCheck"
                value=""
                id="checkoutForm1"
                label="Shipping address is the same as my billing address"
              />
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="checkoutForm2"
                label=" Save this information for next time"
                defaultChecked
              />

              <hr className="my-4" />

              <h5 className="mb-4">Payment</h5>

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Credit card"
                checked
              />

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Debit card"
              />

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Paypal"
                wrapperClass="mb-4"
              />

              <MDBRow>
            
                <MDBCol>
                  <MDBInput
                    label="Name on card"
                    id="form7"
                    type="text"
                    wrapperClass="mb-4"
                    name="name"
                    value= {details.name}
                    onChange={handleChange}
                  />
                    <MDBInput
                    label="Name on card"
                    id="form7"
                    type="text"
                    wrapperClass="mb-4"
                    name="cardnumber"
                    value={details.cardnumber}
                    onChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="3">
                  <MDBInput
                    label="Expiration"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    name="expiration"
                    value={details.expiration}
                    onChange={handleChange}
                  />
                </MDBCol>
                <MDBCol md="3">
                  <MDBInput
                    label="CVV"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    name="cvv"
                    value={details.cvv}
                    onChange={handleChange}
                  />
                </MDBCol>
                <MDBCol md="3">
                  <MDBInput
                    label="postal code"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    name="postalcode"
                    value={details.postalcode}
                    onChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>
           
              <button type='submit'>Checkout</button>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <h5 className="mb-0">Summary</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>$53.98</span>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Shipping
                  <span>Gratis</span>
                </MDBListGroupItem>
                <hr className="my-2"></hr>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>$53.98</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </form>
    </>
  )
}

export default SinglePlan
