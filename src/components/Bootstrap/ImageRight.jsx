import React from 'react';
import { Row, Col, Card, Button, Image } from 'react-bootstrap';

const ImageRight = ({ component }) => {
  const { title, cards } = component.items && component.items[0];
  const { src, alt } = cards && cards[0].image;
  const { text: headingText } = cards && cards[0].title;
  const { text: leadText } = cards && cards[0].description;

  return (
    <Row className="featurette">
      <Col md={7}>
        <h2 className="featurette-heading fw-normal lh-1">{headingText}</h2>
        <p className="lead">{leadText}</p>
      </Col>
      <Col md={5}>
        <Image src={src} alt={alt} fluid />
      </Col>
    </Row>
  );
};

export default ImageRight; 