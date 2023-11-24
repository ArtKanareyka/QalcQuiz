// App.tsx
import React, { useState, useEffect } from 'react'
import './styles.scss'
import TypeSelector from '../Pages/Type/TypeSelector'
import Input from '../Pages/Input/Input'
import Result from '../Pages/Result/Result'

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedRoofType, setSelectedRoofType] = useState<string>('')
  const [roofData, setRoofData] = useState<number[]>([])
  const [result, setResult] = useState<string | null>(null)

  const handleRoofTypeSelect = (roofType: string) => {
    setSelectedRoofType(roofType)
    setCurrentStep(2)
  }

  const handleDataInputSubmit = (data: number[]) => {
    setRoofData(data)
    setCurrentStep(3)
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    } else if (currentStep === 3 && roofData.length > 0) {
      setCurrentStep(2)
    }
    // Если currentStep === 3 и roofData.length === 0, то останется на текущем шаге.
  }

  const handleRestart = () => {
    setSelectedRoofType('')
    setRoofData([])
    setResult(null)
    setCurrentStep(1)
  }

  useEffect(() => {
    if (roofData.length > 0 && selectedRoofType) {
      let calculatedResult: string | null = null

      switch (selectedRoofType) {
        case 'Односкатная': {
          const A = roofData[0]
          const B = roofData[1]
          const C1 = roofData[2]
          const C2 = roofData[3]
          const D = roofData[4]
          const K = Math.sqrt(B ** 2 + A ** 2)
          const K1 = (K * C1) / A
          const K2 = (K * C2) / A
          const S = D * (K + K1 + K2)
          calculatedResult = S.toFixed(2)
          break
        }

        case 'Двускатная': {
          const A = roofData[0]
          const B = roofData[1]
          const C = roofData[2]
          const D = roofData[3]
          const K = Math.sqrt(B ** 2 + A ** 2)
          const K1 = (K * C) / A
          const S = D * (K + K1) * 2
          calculatedResult = S.toFixed(2)
          break
        }
        case 'Мансардная': {
          const A1 = roofData[0]
          const A2 = roofData[1]
          const B1 = roofData[2]
          const B2 = roofData[3]
          const C = roofData[4]
          const D = roofData[5]
          const K1 = Math.sqrt(A1 ** 2 + B1 ** 2)
          const K2 = Math.sqrt((B2 - B1) ** 2 + (A2 / 2) ** 2)
          const C1 = Math.sqrt(C ** 2 + ((B1 * C) / A1) ** 2)
          const S = D * (C1 + K1 + K2) * 2
          calculatedResult = S.toFixed(2)
          break
        }

        case 'Вальмовая': {
          const A = roofData[0]
          const D = roofData[1]
          const B = roofData[2]
          const K = roofData[3]

          const H2 = Math.sqrt((A - B) / 2 ** 2 + K ** 2)
          const S1 = (H2 * D) / 2
          const B1 = Math.sqrt(H2 ** 2 + D ** 2)
          const H1 = Math.sqrt(B1 ** 2 - (D - B) / 2 ** 2)
          const S2 = ((A + B) / 2) * H1
          const S = S2 * 2 + S1 * 2
          calculatedResult = S.toFixed(2)
          break
        }

        case 'Шатровая': {
          const A = roofData[0]
          const D = roofData[1]
          const K = roofData[2]

          const H2 = Math.sqrt(A / 2 ** 2 + K ** 2)
          const H1 = Math.sqrt(D / 2 ** 2 + K ** 2)
          const S1 = (H2 * D) / 2
          const S2 = (H1 * A) / 2
          const S = S1 + S2
          calculatedResult = S.toFixed(2)
          break
        }

        default:
          break
      }

      setResult(calculatedResult)
    }
  }, [roofData, selectedRoofType])

  return (
    <div className="app__container">
      {currentStep === 1 && <TypeSelector onSelect={handleRoofTypeSelect} />}
      {currentStep === 2 && (
        <Input
          selectedRoofType={selectedRoofType}
          onSubmit={handleDataInputSubmit}
          onBack={handleBack}
          inputData={[]}
        />
      )}
      {currentStep === 3 && (
        <Result
          result={result}
          onRestart={handleRestart}
          selectedRoofType={selectedRoofType}
          inputData={roofData} // Передача данных о вопросах и ответах
        />
      )}
    </div>
  )
}

export default App
