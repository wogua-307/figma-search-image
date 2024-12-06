import { useCallback, useEffect, useRef, useState } from 'react'
import { PLUGIN_POST_KEY, PLUGIN_WEB_POST_KEY } from '../@constant/postKeys'
import { addMosaicToImage } from './utils'

const usePluginMessageHandler = () => {
  const [imgBlob, setImgBlob] = useState<{blob: Blob, url: string}>(null)
  const [sliderValue, setSliderValue] = useState(20)
  const [mosaicBlob, setMosaicBlob] = useState<Blob | null>(null)

  const mosaicRef = useRef<boolean>(false)
  // mosaic effect
  const onMosaic = useCallback(async (sliderValue, imgBlob) => {
    if (!imgBlob || mosaicRef.current) return
    mosaicRef.current = true
    const blob = await addMosaicToImage(imgBlob.url, sliderValue)
    setMosaicBlob(blob as Blob)
    mosaicRef.current = false
  }, [])

  // 强度更新
  const onSliderChange = useCallback((e) => {
    const value = e.target.value
    const pixelSize = parseInt(value, 10)
    setSliderValue(pixelSize)
    onMosaic(pixelSize, imgBlob)
  }, [onMosaic, imgBlob])

  // 处理plugin消息
  const onHandleFromPlugin = useCallback(({ type, message }: {type: string, message: any}) => {
    switch (type) {
      case PLUGIN_POST_KEY.selectionChange:
      case PLUGIN_POST_KEY.uploadFrame:
        if (!message) {
          setImgBlob(null)
          setMosaicBlob(null)
          return
        }
        const {imageBytes} = message
        const blob = new Blob([imageBytes], { type: `image/jpeg` });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = async () => {
          setImgBlob({blob, url})
          onMosaic(sliderValue, {blob, url})
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          setImgBlob(null)
          setMosaicBlob(null)
        }
        img.src = url
        break
      default:
        break
    }
  }, [onMosaic, sliderValue])

  // 处理web的消息
  const onHandleFromWeb = useCallback(({ type, message }: {type: string, message: any}) => {
    switch (type) {
      case PLUGIN_WEB_POST_KEY.webFrameInfo:
      case PLUGIN_WEB_POST_KEY.webFrameImgMosaic:
        parent.postMessage({ pluginMessage: { type, message } }, '*')
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    const onEventMessage = (event: MessageEvent) => {
      const pluginMessage = event.data?.pluginMessage || event.data
      const { type, message, from } = pluginMessage
      if (from === 'plugin') onHandleFromPlugin({ type, message })
      if (from === 'web') onHandleFromWeb({ type, message })
    }
    window.onmessage = onEventMessage
    return () => { window.onmessage = null }
  }, [onHandleFromPlugin, onHandleFromWeb])

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: PLUGIN_WEB_POST_KEY.webFrameInfo } }, '*')
  }, [])

  return {
    imgBlob,
    sliderValue,
    mosaicBlob,
    onSliderChange,
    onMosaic,
    onHandleFromWeb
  }
}

export default usePluginMessageHandler
