import React from 'react'

export default function DateString({
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
    <>
      {`${prefix} ${new Date(date).toLocaleTimeString(locale, format)}`}
    </>
  )
}
