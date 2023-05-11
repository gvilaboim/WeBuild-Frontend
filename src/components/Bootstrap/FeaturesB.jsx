import { Container, Row, Col, Button } from 'react-bootstrap';

const FeaturesB = ({ component }) => {
  const { items, bgColor } = component;
  const { title, sections } = items[0];
  const { r, g, b, a } = bgColor;

  return (
    <div style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}>
      <Container fluid>
        <Row className="row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <Col className="d-flex flex-column align-items-start gap-2">
            <h3 className="fw-bold">{title.text}</h3>
            <p className="text-body-secondary">Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Button variant="primary" size="lg">Primary button</Button>
          </Col>
          <Col>
            <Row className="row-cols-1 row-cols-sm-2 g-4">
              {sections.map((section) => (
                section.cards.map((card) => (
                  <Col className="d-flex flex-column gap-2" key={card.title.text}>
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                      <svg className="bi" width={section.icon.size} height={section.icon.size}>
                        <use xlinkHref={`#${section.icon.name}`} />
                      </svg>
                    </div>
                    <h4 className="fw-semibold mb-0">{card.title.text}</h4>
                    <p className="text-body-secondary">{card.description.text}</p>
                  </Col>
                ))
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeaturesB;