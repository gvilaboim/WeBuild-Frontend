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
          ...(style || {}), // make sure style is defined
          display: itemLoaded ? 'flex' : 'none',
          height: `${style?.heightPx ?? 0}px`,
          width: `${style?.widthPercentage ?? 100}%`,
          // padding: `${style?.padding?.top}% ${style?.padding?.right}% ${style?.padding?.bottom}% ${style?.padding?.left}%`,
          background: `no-repeat center/cover url(${style?.backgroundImage ?? ''})`,
          backgroundSize: 'cover',
          backgroundColor: `rgba(${style?.backgroundColor?.r ?? 0}, ${style?.backgroundColor?.g ?? 0},${style?.backgroundColor?.b ?? 0},${style?.backgroundColor?.a ?? 1})`,
        }}
      >
        {items && items.map((item) => {
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
