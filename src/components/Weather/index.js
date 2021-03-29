import React from 'react'

export default function Weather({temp, description, wind}) {
  return (
    <div>
      <h3>Current temp is {temp}</h3>
      <p>The feeling is {description}</p>
    </div>
  )
}
