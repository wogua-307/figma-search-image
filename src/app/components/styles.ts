import styled from 'styled-components'

export const StyledApp = styled.div`
  padding: 15px 15px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    height: 35px;
    width: 100%;
    appearance: none;
    background: rgba(0,0,0,0.93);
    outline: none;
    -webkit-transition: .2s;
    transition: all .2s;
  }
  input[type="range"] {
    height: 25px;
    background: rgba(0,0,0,0.93);
    outline: none;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background: #07B772;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    width: 30px;
    height: 30px;
    background: #07B772;
    cursor: pointer;
    border: none;
  }

  .slider-value {
    display: flex;
    width: 100%;
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: rgba(0,0,0,0.45);
    font-weight: 500;

    .value {
      font-size: 15px;
      font-weight: 600;
      color: rgba(0,0,0,0.85);
    }
  }
  .image-container {
    width: calc(100% + 30px);
    padding: 25px 0;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px dashed #efefef;
    border-top: 1px dashed #efefef;
    img {
      width: 120px;
      height: 150px;
      background-color: #f5f5f5;
      object-fit: contain;
      border: none;
      outline: none;
    }
  }
  .bottom {
    padding: 10px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .highlight {
      height: 30px;
      padding: 0 10px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 400;
      margin-left: 15px;
    }
  }
`
