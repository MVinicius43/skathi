import { ArrowCircleUp, Images } from '@phosphor-icons/react'
import { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import {
  DropBoxContainer,
  Container,
  DragAndDropText,
  DropInput,
  DropBoxDragActive,
} from './style'
import { ImagesBox } from './components/ImagesBox'

export function DropBox() {
  const [paths, setPaths] = useState<string[]>([])

  const onDrop = useCallback((files: FileWithPath[]) => {
    setPaths(files.map((file) => URL.createObjectURL(file)))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Container>
      {paths.length === 0 ? (
        <DropBoxContainer {...getRootProps()} isDragActive={isDragActive}>
          <DropInput {...getInputProps()} />
          {isDragActive ? (
            <DropBoxDragActive>
              <ArrowCircleUp
                size={54}
                color="#6d6d6d"
                weight="fill"
                alt="ArrowCircleUp"
              />
              <DragAndDropText>Solte suas imagens para upload</DragAndDropText>
            </DropBoxDragActive>
          ) : (
            <>
              <Images size={54} color="#6d6d6d" weight="light" alt="Images" />
              <DragAndDropText>Arraste e solte uma imagem</DragAndDropText>
            </>
          )}
        </DropBoxContainer>
      ) : (
        <ImagesBox paths={paths} />
      )}
    </Container>
  )
}
