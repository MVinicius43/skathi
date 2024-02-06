import { useEffect, useState } from 'react'

import {
  ButtonsContainer,
  Container,
  DownloadButton,
  ImageContainer,
  ImagesBoxContainer,
  ImagesRow,
} from './style'
import { http } from '../../../../api/http'

import { X } from '@phosphor-icons/react'
import { Buffer } from 'buffer'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { DropBox } from '../..'

type ImagesBoxProps = {
  paths: string[]
}

export function ImagesBox({ paths }: ImagesBoxProps) {
  const [pathsBackgroundRemoved, setPathsBackgroundRemoved] = useState<
    string[]
  >([])
  const [progress, setProgress] = useState<number>(0)

  async function fetchImgBackgroundRemoved() {
    await http
      .post(
        '/removebg',
        {
          image_file_b64: '',
          image_url: 'https://www.remove.bg/example-hd.jpg',
          size: 'preview',
          type: 'auto',
          type_level: '1',
          format: 'auto',
          roi: '0% 0% 100% 100%',
          crop: false,
          crop_margin: '0',
          scale: 'original',
          position: 'original',
          channels: 'rgba',
          add_shadow: false,
          semitransparency: true,
          bg_color: '',
          bg_image_url: '',
        },
        {
          onUploadProgress: (e) => {
            if (e.total) {
              const progress = Number(Math.round((e.loaded * 100) / e.total))
            }
          },
        },
      )
      .then((data) => {
        console.log(
          'data:image/png;base64,' +
            Buffer.from(data.data, 'binary').toString('base64'),
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function fetchTest() {
    let interval: NodeJS.Timeout

    await new Promise((resolve) => {
      let i = 20

      interval = setInterval(() => {
        setProgress(i)
        i = i + 20
      }, 1000)
      setTimeout(resolve, 5000)
    })
      .then(() => {
        setPathsBackgroundRemoved(paths)
        clearInterval(interval)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  function removeImageFromPath(image: string) {
    const newImagesList = [...pathsBackgroundRemoved]

    setPathsBackgroundRemoved(
      newImagesList.filter((imageList) => imageList !== image),
    )
  }

  useEffect(() => {
    // fetchImgBackgroundRemoved()
    fetchTest()
  }, [])

  return (
    <>
      <Container
        display={pathsBackgroundRemoved.length === 0 && progress === 100}
      >
        <ImagesBoxContainer>
          {pathsBackgroundRemoved.length === 0 && progress !== 100
            ? paths.map((path) => {
                return (
                  <ImagesRow key={path}>
                    <ImageContainer>
                      <img src={path} alt="uploaded image" />
                    </ImageContainer>
                    <CircularProgressbar
                      styles={{
                        root: {
                          width: 42,
                          color: 'ButtonFace',
                        },
                        path: { stroke: '#808080' },
                        text: {
                          fontWeight: 'bold',
                          fill: '#000',
                        },
                      }}
                      strokeWidth={10}
                      text={`${progress}%`}
                      value={progress}
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
          <DownloadButton>Download</DownloadButton>
        </ButtonsContainer>
      </Container>
      {pathsBackgroundRemoved.length === 0 && progress === 100 && <DropBox />}
    </>
  )
}
