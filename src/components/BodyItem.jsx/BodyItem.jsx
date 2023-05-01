import { useState } from 'react'
import { Rnd } from 'react-rnd'

const BodyItem = ({
  component: {
    _id,
    name,
    layout,
    bgColor: { r, g, b, a },
  },
  parentWidth,
  parentHeight,
}) => {
  const [componentLayout, setComponentLayout] = useState({
    ...layout,
    x: layout.x / parentWidth,
    y: layout.y / parentHeight,
  })

  const handleDragStop = (e, { x, y }) => {
    const newLayout = {
      ...componentLayout,
      x: x / parentWidth,
      y: y / parentHeight,
    }
    setComponentLayout(newLayout)
    console.log(newLayout)
    // handle drag stop event here, e.g. update the layout in the parent component's state
  }

  const handleResize = (e, direction, ref, delta, position) => {
    const { width, height } = ref.style
    const newLayout = {
      ...componentLayout,
      w: parseInt(width),
      h: parseInt(height),
      x: position.x / parentWidth,
      y: position.y / parentHeight,
    }

    setComponentLayout(newLayout)
    // handle resize event here, e.g. update the layout in the parent component's state
  }

  return (
    <Rnd
      key={_id}
      size={{ width: `${componentLayout.w}%`, height: `${componentLayout.h}%` }}
      position={{
        x: componentLayout.x * parentWidth,
        y: componentLayout.y * parentHeight,
      }}
      onDragStop={handleDragStop}
      onResize={handleResize}
      bounds='parent'
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
        border: '1px solid green',
      }}
    >
      {name}
    </Rnd>
  )
}

export default BodyItem
