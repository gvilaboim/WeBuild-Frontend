import { Container, Row, Col } from 'react-bootstrap';

const FeaturesA = ({ component }) => {
  const { items } = component;
  const { title, sections } = items[0];

  return (
    <div>
      <Container fluid>
        <h1 className="visually-hidden">{title.text}</h1>
        {sections.map((section, index) => (
          <Container className="px-4 py-5" id={`featured-${index}`} key={index}>
            <h2 className="pb-2 border-bottom">{section.title.text}</h2>
            <Row className="g-4 py-5 row-cols-1 row-cols-lg-3">
              {section.cards.map((card, i) => (
                <Col className="feature" key={i}>
                  <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                    <svg className="bi" width={section.icon.size} height={section.icon.size}><use xlinkHref={`#${section.icon.name}`}/></svg>
                  </div>
                  <h3 className="fs-2">{card.title.text}</h3>
                  <p>{card.description.text}</p>
                  <a href={card.button.href} className="icon-link">
                    {card.button.text}
                    <svg className="bi"><use xlinkHref={`#${card.button.icon}`} /></svg>
                  </a>
                </Col>
              ))}
            </Row>
          </Container>
        ))}
      </Container>
    </div>
  );
};

export default FeaturesA;
