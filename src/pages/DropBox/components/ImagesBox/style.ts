import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100vh;
  gap: 10px;
`

export const ImagesBoxContainer = styled.div`
  background: #aaaaaa;
  border-radius: 10px;
  border: 5px solid #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 13px;
`

export const ImagesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 500px;
  height: 108px;
  padding: 15px;
  border-bottom: 1px solid #ffffff;
`

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: #ffffff;
  border-radius: 8px;
  border: 2px solid #808080;

  > img {
    width: 70px;
    height: 70px;
  }
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

export const DownloadButton = styled.button`
  padding: 10px;
  border: 2px solid #ffffff;
  border-radius: 5px;
  font-weight: bold;
  color: #6d6d6d;
  background: #d5d5d5;

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }
`

export const CancelButton = styled.button`
  padding: 10px;
  border: 2px solid #ffffff;
  border-radius: 5px;
  font-weight: bold;
  color: #d5d5d5;
  background: transparent;

  cursor: pointer;
`
