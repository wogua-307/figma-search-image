const isImageNode = (node: SceneNode) => {
  const filterType = ['RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'VECTOR']
  if (filterType.includes(node.type) && 'fills' in node) {
    // 检查 fills 是否包含 IMAGE 类型
    const fills = node.fills as Paint[] // 类型断言为 Paint[]
    return fills?.some(fill => fill.type === 'IMAGE')
  }
  return false
}

export {
  isImageNode
}