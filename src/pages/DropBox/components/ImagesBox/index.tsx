import { useCallback, useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import imglyRemoveBackground from '@imgly/background-removal'
import CircularProgress from '@mui/joy/CircularProgress'

import {
  ButtonsContainer,
  CancelButton,
  Container,
  DownloadButton,
  ImageContainer,
  ImagesBoxContainer,
  ImagesRow,
} from './style'

type ImagesBoxProps = {
  paths: string[]
}

export function ImagesBox({ paths }: ImagesBoxProps) {
  const [pathsForBackgroundRemoved, setPathsForBackgroundRemoved] = useState<
    string[]
  >([])
  const [pathsBackgroundRemoved, setPathsBackgroundRemoved] = useState<
    string[]
  >([])

  function removeImageFromPath(image: string) {
    const newImagesList = [...pathsBackgroundRemoved]

    setPathsBackgroundRemoved(
      newImagesList.filter((imageList) => imageList !== image),
    )
    setPathsForBackgroundRemoved(
      newImagesList.filter((imageList) => imageList !== image),
    )
  }

  async function downloadImages() {
    const zip = new JSZip()
    let count = 0
    const zipFilename = 'Pictures.zip'

    pathsBackgroundRemoved.forEach(function (url, i) {
      let filename = pathsBackgroundRemoved[i]
      filename = filename
        .replace(/[\/\*\|\:\<\>\?\"\\]/gi, '')
        .replace('httpsi.imgur.com', '')

      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err
        }
        zip.file(filename, data, { binary: true })
        count++
        if (count === pathsBackgroundRemoved.length) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, zipFilename)
          })
        }
      })
    })
  }

  const fetchRemovedBackground = useCallback(() => {
    const pathsRemovedBg: string[] = []

    Promise.all(
      pathsForBackgroundRemoved.map(async (path) => {
        await imglyRemoveBackground(path).then((blob: Blob) => {
          pathsRemovedBg.push(URL.createObjectURL(blob))
          return URL.createObjectURL(blob)
        })
      }),
    ).then(() => {
      setPathsBackgroundRemoved(pathsRemovedBg)
    })
  }, [pathsForBackgroundRemoved])

  useEffect(() => {
    fetchRemovedBackground()
  }, [fetchRemovedBackground])

  useEffect(() => {
    if (pathsForBackgroundRemoved.length === 0) {
      setPathsForBackgroundRemoved(paths)
    }
  }, [paths, pathsForBackgroundRemoved.length])

  return (
    <>
      <Container>
        <ImagesBoxContainer>
          {pathsBackgroundRemoved.length === 0
            ? paths.map((path) => {
                return (
                  <ImagesRow key={path}>
                    <ImageContainer>
                      <img src={path} alt="uploaded image" />
                    </ImageContainer>
                    <CircularProgress
                      variant="soft"
                      size="sm"
                      color="neutral"
                    />
                  </ImagesRow>
                )
              })
            : pathsBackgroundRemoved.map((pathBgRemoved) => {
                return (
                  <ImagesRow key={pathBgRemoved}>
                    <ImageContainer>
                      <img src={pathBgRemoved} alt="uploaded image" />
                    </ImageContainer>
                    <X
                      size={32}
                      color="#FE2E2E"
                      weight="bold"
                      cursor="pointer"
                      onClick={() => removeImageFromPath(pathBgRemoved)}
                    />
                  </ImagesRow>
                )
              })}
        </ImagesBoxContainer>
        <ButtonsContainer>
          <CancelButton onClick={() => window.location.reload()}>
            Cancelar
          </CancelButton>
          <DownloadButton
            disabled={pathsBackgroundRemoved.length === 0}
            onClick={() => downloadImages()}
          >
            Download
          </DownloadButton>
        </ButtonsContainer>
      </Container>
    </>
  )
}
