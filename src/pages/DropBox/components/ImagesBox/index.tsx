import { X } from '@phosphor-icons/react'
import {
  Container,
  ImageContainer,
  ImagesBoxContainer,
  ImagesRow,
} from './style'

type ImagesBoxProps = {
  paths: string[]
}

export function ImagesBox({ paths }: ImagesBoxProps) {
  return (
    <Container>
      <ImagesBoxContainer>
        {paths.map((path) => {
          return (
            <ImagesRow key={path}>
              <ImageContainer>
                <img src={path} alt="uploaded image" />
              </ImageContainer>
              <X size={32} color="#FE2E2E" weight="bold" cursor="pointer" />
            </ImagesRow>
          )
        })}
      </ImagesBoxContainer>
    </Container>
  )
}
