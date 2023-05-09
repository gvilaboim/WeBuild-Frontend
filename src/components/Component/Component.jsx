import { useEffect, useState } from 'react'
import './Component.css'
import Loading from '../Loading/Loading'
import Button from 'react-bootstrap/Button'
const Component = ({
  component: { style, items },
  showSettings,
  getComponentInfo,
  componentInfo,
}) => {
  console.log(items)
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
        onDoubleClick={showSettings}
        style={{
          ...style,
          display: itemLoaded ? 'flex' : 'none',
          height: `${style.height}%`,
          width: `${style.width}%`,
          padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
          background: `no-repeat center/cover url(${style.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundColor: `rgba(${style.backgroundColor.r}, ${style.backgroundColor.g},${style.backgroundColor.b},${style.backgroundColor.a})`,
        }}
      >
        {items.map((item) => {
          return (
            <div style={{...item.style}}>
              <div style={{marginBottom: "30px"}}>{item.title}</div>
              <div>{item.subtitle}</div>
              <Button variant='light'>{item.button}</Button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Component
