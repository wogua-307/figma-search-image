import React, { useCallback } from 'react'
import { StyledApp } from './styles'
import { StyledGlobal } from '../../global-style'
import usePluginMessageHandler from './usePluginMessageHandler'
import PluginButton from './PluginButton'
import { PLUGIN_WEB_POST_KEY } from '../@constant/postKeys'

const App = () => {
  const { imgBlob, sliderValue, mosaicBlob, onMosaic, onHandleFromWeb, onSliderChange } =  usePluginMessageHandler()

  const onApply = useCallback(async () => {
    const buffer = await mosaicBlob.arrayBuffer()
    onHandleFromWeb({type: PLUGIN_WEB_POST_KEY.webFrameImgMosaic, message: {imageBytes: buffer}})
  }, [onHandleFromWeb, mosaicBlob])
  
  return (
    <StyledApp>
      <input
        type="range"
        min={1}
        max={100}
        step={1}
        value={sliderValue}
        onChange={onSliderChange} />
        <div className='slider-value'>
          <div>1</div>
          <div className='value'>{sliderValue}</div>
          <div>100</div>
        </div>
      <div className='image-container'>
        <img src={imgBlob?.url} alt=''/>
        <img src={(mosaicBlob) ? URL.createObjectURL(mosaicBlob) : null} alt=''/>
      </div>
      <div className='bottom'>
        <PluginButton label='Refresh' disable={!imgBlob} onClick={() =>onMosaic(sliderValue, imgBlob)} type='highlight'/>
        <PluginButton label='Apply' disable={!mosaicBlob} onClick={() => onApply()} type='highlight'/>
      </div>
      <StyledGlobal />
    </StyledApp>
  )
}

export default React.memo(App)
