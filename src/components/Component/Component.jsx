import { useContext, useEffect, useState } from 'react'
import { CanvasContext } from '../../context/canvas.context'

import './Component.css'
import Loading from '../Loading/Loading'
import Button from 'react-bootstrap/Button'

const Component = ({ component: { style, items }, showSettings }) => {
  const [itemLoaded, setItemLoaded] = useState(false)
  const { isSiteLive } = useContext(CanvasContext)

  const hasFinishedLoading = (e) => {
    setItemLoaded(true)
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
          height: `${style.heightPx}px`,
          width: `${style.widthPercentage}%`,
          // padding: `${style.padding.top}% ${style.padding.right}% ${style.padding.bottom}% ${style.padding.left}%`,
          background: `no-repeat center/cover url(${style.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundColor: `rgba(${style.backgroundColor.r}, ${style.backgroundColor.g},${style.backgroundColor.b},${style.backgroundColor.a})`,
        }}
      >
        {items.map((item) => {
          return (
            <div style={{ ...item.style }}>
              <div style={{ marginBottom: '30px' }}>{item.title}</div>
              <div>{item.subtitle}</div>
              <Button
                variant='light'
                href={isSiteLive ? item.button.href : '#'}
              >
                {item.button.text}
              </Button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Component
