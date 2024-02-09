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
    const b64Files: string[] = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function () {
        const base64data = reader.result
        if (base64data && typeof base64data === 'string') {
          b64Files.push(base64data)
        }
        setPaths(b64Files)
      }
    })
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
