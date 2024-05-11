import { supabase } from '@/utils/supabase'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

const Photograph = () => {
  const [resultVisible, setResultVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const constraints = {
      video: true,
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log('Got MediaStream:', stream)

        // 将视频流附加到video元素
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      })
      .catch((err) => {
        console.error('Error accessing media devices.', err)
      })
  }, [])

  const handlePhotograph = () => {
    if (!canvasRef.current) return console.error('Canvas element not found')
    const ctx = canvasRef.current.getContext('2d')!
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight
      ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight)
      setResultVisible(true)
    }
  }

  const handleReset = () => {
    setResultVisible(false)
  }

  const handleConfirm = () => {
    if (!canvasRef.current) {
      return console.error('Canvas element not found')
    }
    canvasRef.current.toBlob((blob) => {
      console.log(blob)
      handleUpload(blob!)
    })
  }

  const handleUpload = async (blob: Blob) => {
    console.log('Uploading...')

    const { data, error } = await supabase.storage
      .from('image')
      .upload(`${uuid()}.png`, blob)

    if (error) {
      console.error('Error uploading: ', error.message)
      return
    }

    console.log(data)
  }

  return (
    <>
      <div className={resultVisible ? '' : 'hidden'}>
        <div>
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="flex gap-4 mt-2">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
      <div className={`flex flex-col ${resultVisible ? 'hidden' : ''}`}>
        <div>
          <video ref={videoRef}></video>
        </div>
        <div className="flex gap-4 mt-2">
          <Button onClick={handlePhotograph}>Photograph</Button>
        </div>
      </div>
    </>
  )
}

export default Photograph
