import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Button, Image } from 'react-bootstrap';
import { CanvasContext } from '../../context/canvas.context';
import { useParams } from 'react-router-dom';

const ImageRight = ({ component , showSettings }) => {
  const { saveChanges, setContentSections } = useContext(CanvasContext);
  const { id } = useParams();
  const wrapperRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const [componentData, setComponentData] = useState({
    title: component.items[0]?.content[0]?.cards[0]?.title?.text,
    description: component.items[0]?.content[0]?.cards[0].description?.text,
    imageSrc: component.items[0]?.content[0]?.cards[0].image?.src,
    imageAlt: component.items[0]?.content[0]?.cards[0].image?.alt
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
      NewComponent.items[0].content[0].cards[0].title.text = componentData.title
      NewComponent.items[0].content[0].cards[0].description.text = componentData.description
      NewComponent.items[0].content[0].cards[0].image.src = componentData.imageSrc
      NewComponent.items[0].content[0].cards[0].image.alt = componentData.imageAlt

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
    <Row className="featurette">
      <Col md={7}>
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
                name='title-h3'
                onDoubleClick={(e) => handleDoubleClick(e)}
                className="featurette-heading fw-normal lh-1"
                              >
                {componentData.title}
              </h2>
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
                className="lead"
              >
                {componentData.description}
              </p>
            )}

      </Col>
      <Col md={5}>
        <Image src={componentData.imageSrc} alt={componentData.imageAlt} fluid />
      </Col>
    </Row>
    </div>
  );
};

export default ImageRight; 
