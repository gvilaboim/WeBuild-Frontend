import { useDrag } from 'react-dnd'

const DraggableComponent = ({ component, closeSidebar }) => {
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
    border: '1px solid black',
    backgroundColor: 'white',
    cursor: 'move',
  }
  const opacity = isDragging ? 0.4 : 1

  return (
    <div
      ref={drag}
      style={{ ...style, opacity }}
      onDragStart={closeSidebar}
    >
      {component.name}
    </div>
  )
}

export default DraggableComponent
