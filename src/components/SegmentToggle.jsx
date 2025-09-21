import React from 'react'

export default function SegmentToggle({ options = [], selected, onChange }) {
  if (!options || options.length === 0) return null
  return (
    <div className="segmented">
      {options.map((opt) => {
        const isSelected = selected === opt
        return (
          <button
            key={opt}
            className={`seg-btn ${isSelected ? 'seg-selected' : ''}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
