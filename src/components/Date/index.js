import React from 'react'

export default function DateData({
  date,
  prefix,
  format = {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  },
  locale = 'es-ES'}) {
  return (
    <div>
      {`${prefix} ${new Date(date).toLocaleTimeString(locale, format)}`}
    </div>
  )
}
