import styled, { css } from 'styled-components'

type DropBoxContainerProps = {
  isDragActive: boolean
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`

export const DropInput = styled.input``

export const DropBoxContainer = styled.div<DropBoxContainerProps>`
  background: #ffffff;
  border-radius: 10px;
  border: 5px solid #6d6d6d;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;

  font-size: 13px;

  cursor: pointer;

  &:hover {
    background: #d5d5d5;
    margin: 15px;
    border-radius: 10px;
    border: 2px dashed #6d6d6d;
  }

  ${({ isDragActive }) =>
    !isDragActive &&
    css`
      padding: 70px;
    `};
`

export const DropBoxDragActive = styled.div`
  background: #d5d5d5;
  padding: 70px;
  margin: 15px;
  border-radius: 10px;
  border: 2px dashed #6d6d6d;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 18px;

  font-size: 13px;

  cursor: pointer;
`

export const DragAndDropText = styled.h2``
