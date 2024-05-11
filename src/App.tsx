import { useState } from 'react'
import { Button } from 'antd'
import Photograph from '@/components/Photograph'

function App() {
  const [step, setStep] = useState(1)

  return (
    <>
      {step === 1 && <Button onClick={() => setStep(2)}>Open camera</Button>}

      {step === 2 && <Photograph />}
    </>
  )
}

export default App
