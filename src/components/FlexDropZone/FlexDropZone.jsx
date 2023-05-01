import { useContext} from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'

import './FlexDropZone.css'
import BodyItem from '../BodyItem.jsx/BodyItem'
// responsive grid
const FlexDropZone = () => {
  const { bodyComponents, setBodyComponents } = useContext(CanvasContext)


  //Defines this Component as a Drop zone 
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // Only accepts Items with type Body
    accept: ItemTypes.BODY, 
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

    //   on Drop, add to this components array of items to render
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
      className='flex-drop-zone'
    >
      {bodyComponents.length > 0 ? (
          bodyComponents.map((component) => {
        
            return (
             <BodyItem component={component}/>
            )
          })
        ) : (
        <div>{isActive ? 'Drop the component here' : 'Drag a component here'}</div>
      )}
    </div>
  )
}


export default FlexDropZone