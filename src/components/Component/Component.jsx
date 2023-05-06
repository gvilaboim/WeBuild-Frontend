import { useEffect, useState } from 'react'
import './Component.css'
import Loading from '../Loading/Loading'
const Component = ({ component: { style, text }, showSettings , getComponentInfo ,componentInfo}) => {
  const [itemLoaded, setItemLoaded] = useState(false)
  
  const hasFinishedLoading = (e) => {
    setItemLoaded(true)
  }

  const getinfo = (e) => {
    getComponentInfo(componentInfo)
    showSettings()
}

  useEffect(() => {
    hasFinishedLoading()
  
    return () => {
      setItemLoaded(false)
    }
  }, [])
  
  return (
    <>
      {!itemLoaded && <Loading />}

      <div
        className='component'
        onClick={getinfo}
        style={{
          ...style,
          display: itemLoaded ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          height: `${style.height}%`,
          width: `${style.width}%`,
          padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
          backgroundImage: `url(${style.backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: `rgba(${style.backgroundColor.r}, ${style.backgroundColor.g},${style.backgroundColor.b},${style.backgroundColor.a})`,
        }}
      >
        {text}
      </div>
    </>
  )
}

export default Component
