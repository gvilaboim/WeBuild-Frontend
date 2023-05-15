import { Container, Row, Col } from 'react-bootstrap';
import { CanvasContext } from '../../context/canvas.context';
import { cloneElement, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const FeaturesA = ({ component, showSettings }) => {
  const { saveChanges, setContentSections } = useContext(CanvasContext);
  const { id } = useParams();
  const wrapperRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  

  const [componentData, setComponentData] =  useState({
    title: component.items[0]?.content[0]?.title?.text,
    card1_title_text: component.items[0]?.content[0]?.cards[0]?.title?.text,
    card1_description_text: component.items[0]?.content[0]?.cards[0]?.description?.text,
    card1_button_text: component.items[0]?.content[0]?.cards[0]?.button?.text,
    card2_title_text: component.items[0]?.content[0]?.cards[1]?.title?.text,
    card2_description_text: component.items[0]?.content[0]?.cards[1]?.description?.text,
    card2_button_text: component.items[0]?.content[0]?.cards[1]?.button?.text,
    card3_title_text: component.items[0]?.content[0]?.cards[2]?.title?.text,
    card3_description_text: component.items[0]?.content[0]?.cards[2]?.description?.text,
    card3_button_text: component.items[0]?.content[0]?.cards[2]?.button?.text,
  } );

  //corrigir erro aqui

 
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
      NewComponent.items[0].content[0].title.text = componentData.title
      NewComponent.items[0].content[0].cards[0].title.text = componentData.card1_title_text
      NewComponent.items[0].content[0].cards[0].description.text = componentData.card1_description_text
      NewComponent.items[0].content[0].cards[0].button.text = componentData.card1_button_text
    
      NewComponent.items[0].content[0].cards[1].title.text = componentData.card2_title_text
      NewComponent.items[0].content[0].cards[1].description.text =  componentData.card2_description_text
      NewComponent.items[0].content[0].cards[1].button.text =  componentData.card2_button_text
    
      NewComponent.items[0].content[0].cards[2].title.text =  componentData.card3_title_text
      NewComponent.items[0].content[0].cards[2].description.text =  componentData.card3_description_text
      NewComponent.items[0].content[0].cards[2].button.text =  componentData.card3_button_text

      console.log(NewComponent.items[0].content[0])
     
      const contentArray = [NewComponent.items[0].content[0]];
      console.log(contentArray)
      saveChanges(id, {
        componentToEdit: { data: contentArray , id: component._id },
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
        <Container className="px-4 py-5" id={`featured-0`}>
          {isEditing ? (
            <input
              onChange={handleChange}
              className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
              type='text'
              value={componentData.title}
              name='title'
            />
          ) : (
            <h2
              name='title-h1'
              onDoubleClick={(e) => handleDoubleClick(e)}
              className="pb-2 border-bottom"
            >
              {componentData.title}
            </h2>
          )}


          <Row className="g-4 py-5 row-cols-1 row-cols-lg-3">
            <Col className="feature">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
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
                <h3
                  name='card1_title_text'
                  onDoubleClick={(e) => handleDoubleClick(e)}
                  className="fs-2"
                >
                  {componentData.card1_title_text}
                </h3>
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
                >
                  {componentData.card1_description_text}
                </p>
              )}


              {isEditing ? (
                <input
                  onChange={handleChange}
                  className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                  type='text'
                  value={componentData.card1_button_text}
                  name='card1_button_text'
                />
              ) : (
                <a
                  href="#"
                  className="icon-link"
                  name='card1_button_text'
                  onDoubleClick={(e) => handleDoubleClick(e)}
                >
                  {componentData.card1_button_text}
                  <svg className="bi">
                    <use xlinkHref="#chevron-right" />
                  </svg>
                </a>
              )}


            </Col>
            <Col className="feature">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
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
                <h3
                  name='card2_title_text'
                  onDoubleClick={(e) => handleDoubleClick(e)}
                  className="fs-2"
                >
                  {componentData.card2_title_text}
                </h3>
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
                >
                  {componentData.card2_description_text}
                </p>
              )}


              {isEditing ? (
                <input
                  onChange={handleChange}
                  className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                  type='text'
                  value={componentData.card2_button_text}
                  name='card2_button_text'
                />
              ) : (
                <a
                  href="#"
                  className="icon-link"
                  name='card2_button_text'
                  onDoubleClick={(e) => handleDoubleClick(e)}
                >
                  {componentData.card2_button_text}
                  <svg className="bi">
                    <use xlinkHref="#chevron-right" />
                  </svg>
                </a>
              )}
            </Col>
            <Col className="feature">
              <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
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
                <h3
                  name='card3_title_text'
                  onDoubleClick={(e) => handleDoubleClick(e)}
                  className="fs-2"
                >
                  {componentData.card3_title_text}
                </h3>
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
                >
                  {componentData.card3_description_text}
                </p>
              )}
             
             {isEditing ? (
                <input
                  onChange={handleChange}
                  className='display-5 fw-bold text-body-emphasis lh-1 mb-3 '
                  type='text'
                  value={componentData.card3_button_text}
                  name='card3_button_text'
                />
              ) : (
                <a
                  href="#"
                  className="icon-link"
                  name='card3_button_text'
                  onDoubleClick={(e) => handleDoubleClick(e)}
                >
                  {componentData.card3_button_text}
                  <svg className="bi">
                    <use xlinkHref="#chevron-right" />
                  </svg>
                </a>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default FeaturesA;