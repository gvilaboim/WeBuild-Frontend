import { useLocation } from 'react-router'
import DraggableComponent from '../DraggableComponent/DraggableComponent'
import { useContext, useEffect } from 'react'
import { CanvasContext } from '../../context/canvas.context'
import Loading from '../Loading/Loading'

const CanvasStore = ({ setShowSidebar }) => {

  const { storeComponents, fetchStoreItems } = useContext(CanvasContext)

  useEffect(() => {
    
    fetchStoreItems()
  }, [])
  
  return (
    <>
        <div>
          <div>
            <div>Add a Section</div>
            <div>Choose from the list below by dragging to your canvas</div>
          </div>
          <div>
            {storeComponents.length > 0 ? (
              storeComponents.map((component) => {
                return (
                  <DraggableComponent
                    key={component._id}
                    component={component}
                  />
                )
              })
            ) : (
              <Loading />
            )}
          </div>

          <button
            onClick={() => setShowSidebar(false)}
            type='button'
          >
            Hide Sidebar
          </button>
        </div>
   
    </>
  )
}

export default CanvasStore
