// TypeSelector.tsx
import React from 'react'
import storage from '../../Data/storage'
import './type.scss'
import { Button } from '@mui/material'

interface TypeSelectorProps {
  onSelect: (roofType: string) => void
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="calc-quiz-type__container">
      <h2 className="calc-quiz-type__title">Выберите тип крыши:</h2>
      {storage.map((item) => (
        <Button
          variant="outlined"
          className="calc-quiz-type__buttons"
          key={item.id}
          onClick={() => onSelect(item.typeRoof)}
        >
          {item.typeRoof}

          <img
            className="calc-quiz-type__image"
            src={item.image}
            alt={item.alt}
          />
        </Button>
      ))}
    </div>
  )
}

export default TypeSelector
