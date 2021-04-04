import React from 'react'

export default function Temperature({degrees, unitType}) {
  return (
    <>
      {unitType === 'metric' ? Math.round(degrees) : Math.round((degrees * 9/5) + 32)} {unitType === 'metric'? 'ºC' : 'ºF'}
    </>
  )
}
