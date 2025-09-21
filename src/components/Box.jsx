import React from 'react'

export default function Box({ title, value }) {
  return (
    <div className="box">
      <div className="box-title">{title}</div>
      <div className="box-value">{typeof value === 'number' ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}</div>
    </div>
  )
}
