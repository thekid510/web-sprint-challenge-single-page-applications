import React from 'react'

 function Pizza({ details }) {
  if (!details) {
    return <h3>Working fetching your pizza&apos;s details...</h3>
  }

  return (
    <div className='pizza container'>
      <h2>{details.name}</h2>
      <p>Size: {details.size}</p>
      <p>Toppings: {details.toppings}</p>
      <p>Special Instructions: {details.instructions}</p>

      {
        !!details.toppings && !!details.toppings.length &&
        <div>
          Toppings:
          <ul>
            {details.toppings.map((like, idx) => <li key={idx}>{like}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default Pizza

