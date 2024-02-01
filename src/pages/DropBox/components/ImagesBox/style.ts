import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`

export const ImagesBoxContainer = styled.div`
  background: #aaaaaa;
  border-radius: 10px;
  border: 5px solid #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;

  font-size: 13px;
`

export const ImagesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 380px;
  padding: 10px;
  border-bottom: 1px solid #ffffff;
`

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #808080;

  > img {
    width: 80px;
    height: 80px;
    mix-blend-mode: multiply;
  }
`
