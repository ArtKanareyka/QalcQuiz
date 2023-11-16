// RoofTypeSelector.tsx
import React from 'react'
import storage from './storage'

interface RoofTypeSelectorProps {
  onSelect: (roofType: string) => void
}

const RoofTypeSelector: React.FC<RoofTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="type-roof__container">
      <h2 className="type-roof__title">Выберите тип крыши:</h2>
      {storage.map((item) => (
        <div
          className="type-roof__buttons"
          key={item.id}
          onClick={() => onSelect(item.typeRoof)}
        >
          {item.typeRoof}
          <img
            className="type-roof__image"
            src={item.image}
            alt={item.alt}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  )
}

export default RoofTypeSelector
