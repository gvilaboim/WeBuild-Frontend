import { useContext, useEffect, useMemo, useState } from 'react'
import { ItemTypes } from '../../itemTypes/ItemTypes'
import { useDrop } from 'react-dnd'
import { CanvasContext } from '../../context/canvas.context'
import { Responsive, WidthProvider } from 'react-grid-layout'

import './BodyDropZone.css'

// not responsive grid
// const BodyDropZone = () => {
//   const { bodyComponents, setBodyComponents } = useContext(CanvasContext)

//   const [{ canDrop, isOver }, drop] = useDrop(() => ({
//     accept: ItemTypes.BODY,
//     drop: (item, monitor) => {
//       const draggedComponent = monitor.getItem()

//       setBodyComponents((previousValues) => [
//         ...previousValues,
//         draggedComponent,
//       ])
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//     }),
//   }))

//   const isActive = canDrop && isOver
//   let backgroundColor = ''
//   if (isActive) {
//     backgroundColor = 'darkgreen'
//   } else if (canDrop) {
//     backgroundColor = 'darkkhaki'
//   }
//   const style = {}

//   return (
//     <div
//       ref={drop}
//       style={{ ...style, backgroundColor }}
//     >
//       {bodyComponents.length > 0 ? (
//         <ReactGridLayout
//           className='layout'
//           cols={64}
//           rowHeight={32}
//           width={1800}
//           compactType=''
//         >
//           {bodyComponents.map((component) => {
//             const {
//               bgColor: { r, g, b, a },
//             } = component
//             return (
//               <div
//                 key={component._id}
//                 data-grid={component.layout}
//                 style={{
//                   backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
//                   border: '1px solid green',
//                 }}
//               >
//                 {component.title}
//               </div>
//             )
//           })}
//         </ReactGridLayout>
//       ) : (
//         <p>{isActive ? 'Drop the component here' : 'Drag a component here'}</p>
//       )}
//     </div>
//   )
// }

// responsive grid
const BodyDropZone = () => {
  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), [])

  const { bodyComponents, setBodyComponents } = useContext(CanvasContext)
  const [layouts, setLayouts] = useState(
    bodyComponents.map((comp) => comp.layout)
  )

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BODY,
    drop: (item, monitor) => {
      const draggedComponent = monitor.getItem()

      setBodyComponents((previousValues) => [
        ...previousValues,
        draggedComponent,
      ])
    },
    collect: (monitor) => ({
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

  const onLayoutChange = (newLayout, allLayouts) => {
    setLayouts(allLayouts)
    console.log('X', newLayout[0].x, 'Y', newLayout[0].y, 'W', newLayout[0].w, 'H', newLayout[0].h)
  }

  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      className='body-drop-zone'
    >
      {bodyComponents.length > 0 ? (
        <ResponsiveReactGridLayout
          className='layout'
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          layouts={layouts}
          containerPadding={[100, 50]}
          onLayoutChange={onLayoutChange}
        >
          {bodyComponents.map((component) => {
            const {
              bgColor: { r, g, b, a },
            } = component
            return (
              <div
                key={component._id}
                data-grid={component.layout}
                style={{
                  backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                  border: '1px solid green',
                }}
              >
                {component.title}
              </div>
            )
          })}
        </ResponsiveReactGridLayout>
      ) : (
        <div>{isActive ? 'Drop the component here' : 'Drag a component here'}</div>
      )}
    </div>
  )
}


export default BodyDropZone