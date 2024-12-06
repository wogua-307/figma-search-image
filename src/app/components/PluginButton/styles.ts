import styled from 'styled-components'

export const StyledPluginButton = styled.div`
  font-size: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  color: white;
  cursor: pointer;
  
  &.normal {
    color: rgba(0,0,0,0.4);
  }

  &.highlight {
    background: black;
    &:hover {
      background: #262626;
    }
  }

  &.normal-border {
    color: rgba(0,0,0,0.85);
    border: 1px solid #DEE0E2;
    &:hover {
      background: #EFEFF0;
    }
    &:active {
      background: #E6E7EB;
    }
  }

  &.disable {
    background-color: rgba(0,0,0,0.3);
    pointer-events: none;
  }
`
