import { useContext, useEffect, useRef, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'

import './BodyDropZone.css'
import BodyItem from '../BodyItem.jsx/BodyItem'

const BodyDropZone = () => {
  const { bodyComponents, setBodyComponents } = useContext(CanvasContext)

  //this is needed so the child items can mantain position on window resize
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //Defines this Component as a Drop zone
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // Only accepts Items with type Body
    accept: ItemTypes.BODY,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      //on Drop, add to this components array of items to render
      setBodyComponents((previousValues) => [
        ...previousValues,
        draggedComponent,
      ])
    },
    collect: (monitor) => ({
      // collects properties to be used for logic and styling
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  const style = {}

  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      className='body-drop-zone'
    >
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        {bodyComponents.length > 0 ? (
          bodyComponents.map((component) => {
            return (
              <BodyItem
                key={component._id}
                component={component}
                parentWidth={dimensions.width}
                parentHeight={dimensions.height}
              />
            )
          })
        ) : (
          <div>
            {isActive ? 'Drop the component here' : 'Drag a component here'}
          </div>
        )}
      </div>
    </div>
  )
}

export default BodyDropZone
