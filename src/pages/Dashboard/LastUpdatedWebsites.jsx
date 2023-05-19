import React, { useEffect, useState } from 'react'
import WebsiteDetails from './WebsiteDetails'
import { Col, Row } from 'react-bootstrap'

const LastUpdatedWebsites = ({ communityWebsites }) => {

 
  return (
    <>
      <Row>
      <h1>Recently updated</h1>
        {communityWebsites &&
            communityWebsites.length > 0 &&
            communityWebsites.map((website) => {
            return (
              <Col
                md={4}
                key={website._id}
              >
                <WebsiteDetails website={website} />
              </Col>
            )
          })}
      </Row>
    </>
  )
}

export default LastUpdatedWebsites
