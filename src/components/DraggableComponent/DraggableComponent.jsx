import { useDrag } from 'react-dnd'

const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: component.type,
    item: component,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
    },
    
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const style = {
    cursor: 'move',
  }
  const opacity = isDragging ? 0.4 : 1

  return (
    <div
      ref={drag}
      style={{ ...style, opacity }}
    >
      {component.name}
    </div>
  )
}

export default DraggableComponent
