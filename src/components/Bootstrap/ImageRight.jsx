import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Button, Image, Form } from 'react-bootstrap';
import { CanvasContext } from '../../context/canvas.context';
import { useParams } from 'react-router-dom';

const ImageRight = ({ component, showSettings }) => {
  const {
    setWebsite,
    saveChanges,
    publicView,
    setShowSettingsSidebar,
  } = useContext(CanvasContext);
  const { id } = useParams();

  // Needed to detect clicks outside
  const wrapperRef = useRef(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [componentData, setComponentData] = useState({
    title: component.items[0]?.title?.text,
    titleColor: component.items[0]?.title?.color,
    description: component.items[0]?.description?.text,
    descriptionColor: component.items[0]?.description?.color,
    imageSrc: component.items[0]?.image?.src,
    imageAlt: component.items[0]?.image?.alt,
  });

  const handleClickOutside = (event) => {
    if (!publicView && wrapperRef.current && !wrapperRef.current.contains(event.target.parentNode)) {
      setIsEditing(false);
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    if (clickedOutside && hasChanges) {
      saveChanges(id, {
        componentToEdit: { data: componentData, id: component._id },
      })
        .then((updatedWebsite) => {
          setWebsite(updatedWebsite);
          setClickedOutside(false);
          setHasChanges(false);
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

  const handleDoubleClick = () => {
    if (!publicView) {
      setIsEditing(true);
      setShowSettingsSidebar(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setHasChanges(true);
    // If the name is primaryButton or secondaryButton,
    // update the corresponding button text value
  
      // Otherwise, update the regular component data
      setComponentData((prevValue) => ({ ...prevValue, [name]: value }));

  };

  const toggleSidebar = () => {
    if (!isEditing) showSettings(component);
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
        backgroundColor: style.backgroundColor,
        background: `no-repeat center/cover url(${style.backgroundImage})`,
        padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
      }}
    >
      <Row className="featurette">
        <Col md={7}>
          {isEditing ? (
            <>
              <Form.Group className="mb-3">
                <Form.Control
                  name="title"
                  as="textarea"
                  style={{ color: componentData.titleColor }}
                  value={componentData.title}
                  onChange={handleChange}
                  className="input-title fw-bold lh-1 mb-3 bg-transparent"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label>Text Color:</Form.Label>
                  <Form.Control
                    name="titleColor"
                    type="color"
                    value={componentData.titleColor}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </>
          ) : (
            <h1
              name="title-h1"
              onDoubleClick={handleDoubleClick}
              className="display-5 fw-bold text-body-emphasis lh-1 mb-3"
              style={{ color: componentData.titleColor }}
            >
              {componentData.title}
            </h1>
          )}

          {isEditing ? (
            <>
              <Form.Group className="mb-3">
                <Form.Control
                  name="description"
                  as="textarea"
                  style={{ color: componentData.descriptionColor }}
                  value={componentData.description}
                  onChange={handleChange}
                  className="input-title fw-bold lh-1 mb-3 bg-transparent"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Label>Text Color:</Form.Label>
                  <Form.Control
                    name="descriptionColor"
                    type="color"
                    value={componentData.descriptionColor}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </>
          ) : (
            <p
              name="title-h1"
              onDoubleClick={handleDoubleClick}
              style={{ color: componentData.descriptionColor }}
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