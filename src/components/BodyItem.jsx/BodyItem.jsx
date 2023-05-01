import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const BodyItem = ({ component: { _id, title, layout, bgColor: { r, g, b, a } } }) => {
  const [componentLayout, setComponentLayout] = useState(layout);

  const handleDragStop = (e, { x, y }) => {
    const newLayout = { ...componentLayout, x, y };
    setComponentLayout(newLayout);
    // handle drag stop event here, e.g. update the layout in the parent component's state
  };

  const handleResize = (e, direction, ref, delta, position) => {
    const { width, height } = ref.style;
    const newLayout = {
      ...componentLayout,
      w: parseInt(width),
      h: parseInt(height),
      ...position,
    };
    setComponentLayout(newLayout);
    // handle resize event here, e.g. update the layout in the parent component's state
  };

  return (
    <Rnd
      key={_id}
      size={{ width: componentLayout.w, height: componentLayout.h }}
      position={{ x: componentLayout.x, y: componentLayout.y }}
      onDragStop={handleDragStop}
      onResize={handleResize}
      bounds="parent"
      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`, border: '1px solid green' }}
    >
      {title}
    </Rnd>
  );
};

export default BodyItem;