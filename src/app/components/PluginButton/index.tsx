import React, { CSSProperties } from 'react'
import { StyledPluginButton } from './styles'

type ButtonType = 'normal' | 'highlight' | 'normal-border'
interface PluginButtonProps {
  type: ButtonType,
  styles?: CSSProperties,
  disable?: boolean,
  label: string,
  onClick: () => void
}
const PluginButton = ({ styles, type, disable, label, onClick }: PluginButtonProps) => {
  return (
    <StyledPluginButton style={styles} className={`${type} ${disable && 'disable'}`} onClick={onClick}>
      {label}
    </StyledPluginButton>
  )
}

export default React.memo(PluginButton)
