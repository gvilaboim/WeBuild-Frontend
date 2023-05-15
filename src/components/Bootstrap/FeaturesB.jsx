import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CanvasContext } from '../../context/canvas.context';

const FeaturesB = ({ component, showSettings }) => {
  const { saveChanges, setContentSections } = useContext(CanvasContext);
  const { id } = useParams();
  const wrapperRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const { items, bgColor } = component;
  const { r, g, b, a } = bgColor;

  const [componentData, setComponentData] = useState({
    title: component.items[0]?.content[0]?.title?.text,
    description: component.items[0]?.content[0]?.description?.text,
    button: component.items[0]?.content[0]?.button?.text,
    card1_title_text: component.items[0]?.content[0]?.cards[0]?.title?.text,
    card1_description_text: component.items[0]?.content[0]?.cards[0]?.description?.text,
    card2_title_text: component.items[0]?.content[0]?.cards[1]?.title?.text,
    card2_description_text: component.items[0]?.content[0]?.cards[1]?.description?.text,
    card3_title_text: component.items[0]?.content[0]?.cards[2]?.title?.text,
    card3_description_text: component.items[0]?.content[0]?.cards[2]?.description?.text,
    card4_title_text: component.items[0]?.content[0]?.cards[3]?.title?.text,
    card4_description_text: component.items[0]?.content[0]?.cards[3]?.description?.text,

  });
  const [clickedOutside, setClickedOutside] = useState(false);
  const handleClickOutside = async (event) => {
    if (wrapperRef.current === event.target.parentNode.parentNode) {
      setIsEditing(false);
      setClickedOutside(true);
    }
  };
  useEffect(() => {

    if (clickedOutside) {
      console.log(component.content)
      const NewComponent = component;

      NewComponent.items[0].content[0].title.text = componentData.title;
      NewComponent.items[0].content[0].description.text = componentData.description;
      NewComponent.items[0].content[0].button.text = componentData.button;

      NewComponent.items[0].content[0].cards[0].title.text = componentData.card1_title_text
      NewComponent.items[0].content[0].cards[0].description.text = componentData.card1_description_text;
      NewComponent.items[0].content[0].cards[1].title.text = componentData.card2_title_text
      NewComponent.items[0].content[0].cards[1].description.text = componentData.card2_description_text

      NewComponent.items[0].content[0].cards[2].title.text = componentData.card3_title_text
      NewComponent.items[0].content[0].cards[2].description.text = componentData.card3_description_text
      NewComponent.items[0].content[0].cards[3].title.text = componentData.card4_title_text
      NewComponent.items[0].content[0].cards[3].description.text = componentData.card4_description_text

      console.log(NewComponent.items[0].content[0])

      const contentArray = [NewComponent.items[0].content[0]];
      console.log(contentArray)
      saveChanges(id, {
        componentToEdit: { data: contentArray, id: component._id },
      })
        .then((updatedWebsite) => {
          setContentSections(updatedWebsite.sections);
          setClickedOutside(false);
        })
        .catch((err) => console.log(err));
    }
  }, [clickedOutside]);

  useEffect(() => {

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDoubleClick = (e) => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setComponentData((prevValue) => ({ ...prevValue, [name]: value }));

  };
  const style = component.style;

  return (
    <div
      ref={wrapperRef}
      onClick={() => showSettings(component)}
      style={{
        ...style,
        height: `${style.height}px`,
        width: `${style.width}%`,
        backgroundColor: `${style.backgroundColor}`,
        background: `no-repeat  center/cover url(${style.backgroundImage})`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
      }}
    >
      <Container fluid>
        <Row className="row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <Col className="d-flex flex-column align-items-start gap-2">
            {isEditing ? (
              <input
                onChange={handleChange}
                className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                type='text'
                value={componentData.title}
                name='title'
              />
            ) : (
              <h3
                name='title-h3'
                onDoubleClick={(e) => handleDoubleClick(e)}
                className="fw-bold"
              >
                {componentData.title}
              </h3>
            )}

            {isEditing ? (
              <input
                onChange={handleChange}
                className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                type='text'
                value={componentData.description}
                name='description'
              />
            ) : (
              <p
                name='title-h1'
                onDoubleClick={(e) => handleDoubleClick(e)}
                className="text-body-secondary"
              >
                {componentData.description}
              </p>
            )}



            <Button variant="primary" size="lg">{componentData.button}</Button>
          </Col>
          <Col>
            <Row className="row-cols-1 row-cols-sm-2 g-4">
              <Col className="d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                  <svg className="bi" width="1em" height="1em">
                    <use xlinkHref="#collection" />
                  </svg>
                </div>

                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card1_title_text}
                    name='card1_title_text'
                  />
                ) : (
                  <h4
                    name='card1_title_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="fw-semibold mb-0"
                  >
                    {componentData.card1_title_text}
                  </h4>
                )}
                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card1_description_text}
                    name='card1_description_text'
                  />
                ) : (
                  <p
                    name='card1_description_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="text-body-secondary"
                  >
                    {componentData.card1_description_text}
                  </p>
                )}

              </Col>
              <Col className="d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                  <svg className="bi" width="1em" height="1em">
                    <use xlinkHref="#collection" />
                  </svg>
                </div>
                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card2_title_text}
                    name='card2_title_text'
                  />
                ) : (
                  <h4
                    name='card2_title_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="fw-semibold mb-0"
                  >
                    {componentData.card2_title_text}
                  </h4>
                )}
                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card2_description_text}
                    name='card2_description_text'
                  />
                ) : (
                  <p
                    name='card2_description_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="text-body-secondary"
                  >
                    {componentData.card2_description_text}
                  </p>
                )}
              </Col>
              <Col className="d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                  <svg className="bi" width="1em" height="1em">
                    <use xlinkHref="#collection" />
                  </svg>
                </div>
                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card3_title_text}
                    name='card3_title_text'
                  />
                ) : (
                  <h4
                    name='card3_title_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="fw-semibold mb-0"
                  >
                    {componentData.card3_title_text}
                  </h4>
                )}
                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card3_description_text}
                    name='card3_description_text'
                  />
                ) : (
                  <p
                    name='card3_description_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="text-body-secondary"
                  >
                    {componentData.card3_description_text}
                  </p>
                )}
              </Col>
              <Col className="d-flex flex-column gap-2">
                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
                  <svg className="bi" width="1em" height="1em">
                    <use xlinkHref="#collection" />
                  </svg>
                </div>
                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card4_title_text}
                    name='card4_title_text'
                  />
                ) : (
                  <h4
                    name='card4_title_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="fw-semibold mb-0"
                  >
                    {componentData.card4_title_text}
                  </h4>
                )}
                {isEditing ? (
                  <input
                    onChange={handleChange}
                    className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                    type='text'
                    value={componentData.card4_description_text}
                    name='card4_description_text'
                  />
                ) : (
                  <p
                    name='card4_description_text'
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    className="text-body-secondary"
                  >
                    {componentData.card4_description_text}
                  </p>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeaturesB;