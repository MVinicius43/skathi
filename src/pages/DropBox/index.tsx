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

export function DropBox() {
  const [paths, setPaths] = useState<string[]>([])

  const onDrop = useCallback((files: FileWithPath[]) => {
    setPaths(files.map((file) => URL.createObjectURL(file)))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Container>
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
    </Container>
  )
}

// <div {...getRootProps()}>
//   <input {...getInputProps()} />
//   {isDragActive ? (
//     <p>Drop the files here ...</p>
//   ) : paths.length > 0 ? (
//     paths.map((path) => {
//       return (
//         <div key={path} style={{ display: 'flex', flexDirection: 'row' }}>
//           <img src={path} alt="teste" width={200} height={200} />
//         </div>
//       )
//     })
//   ) : (
//     <p>Drag 'n' drop some files here, or click to select files</p>
//   )}
// </div>
