// https://www.figma.com/plugin-docs/migrating-to-dynamic-loading/
import { PLUGIN_POST_KEY, PLUGIN_WEB_POST_KEY } from '../app/@constant/postKeys'
import { isImageNode } from './utils'
// 插件入口
figma.showUI(__html__, { width: 332, height: 342 })

/** plugin post */
export const figmaPluginPost = (postInfo: {type: string, message: any}) => {
  figma.ui.postMessage({ from: 'plugin', ...postInfo })
}

/**
 * 消息处理
 * @param msg
 */
figma.ui.onmessage = async (msg) => {
  try {
    const type = msg.type
    switch (type) {
      case PLUGIN_WEB_POST_KEY.webFrameInfo: {
        onHandleSelectionChange()
      }
        break
      case PLUGIN_WEB_POST_KEY.webFrameImgMosaic: {
        const { imageBytes } = msg.message
        const imageNode = currentImgNode()
        if (!imageNode) return
        const imageUint8Array = new Uint8Array(imageBytes);
        const imageHash = await figma.createImage(imageUint8Array).hash;
        if ('fills' in imageNode) { 
          // @ts-ignore
          const fill = JSON.parse(JSON.stringify(imageNode.fills.find(item => item.visible)))
          fill.imageHash = imageHash
          imageNode.fills = [fill]
        }
      }
      default:
        break
    }
  } catch (error) {
    console.error('### onmessage error:', error)
  }
  
}

// 获取当前有效的imageNode
const currentImgNode = () => {
  const selection = figma.currentPage.selection
  const imageNodes = selection.filter(node => isImageNode(node))
  if (!imageNodes.length) return null
  const imageNode = imageNodes[0]
  return imageNode
}

const onHandleSelectionChange = async () => {
  const imageNode = currentImgNode()
  if (!imageNode) {
    figmaPluginPost({
      type: PLUGIN_POST_KEY.selectionChange,
      message: null
    })
    return
  }
  // @ts-ignore
  const fill = imageNode.fills.find(item => item.visible)
  const image = figma.getImageByHash(fill.imageHash)
  const imageBytes = await image.getBytesAsync()
  figmaPluginPost({
    type: PLUGIN_POST_KEY.selectionChange,
    message: {
      imageBytes,
      name: imageNode.name,
      id: imageNode.id
    }
  })
}

/**
 * 监听文件内容变化
 */
figma.on('selectionchange', onHandleSelectionChange)
