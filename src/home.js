import React from 'react'
import { useHistory } from 'react-router-dom';


export default function Home(){


const history = useHistory()

    const routeToOrder = () => {
    history.push('/order')
}

return (
<div className='home-wrapper'>
    <img className='home-image'
    src='https://www.performancefoodservice.com/-/media/PFS/Recipes/Hero---Full-Width/performancefoodservice-recipes-hearty-pizza_heroFull.jpg?h=966&w=2302&la=en&hash=B1691FC60983D414E23752A7DFE1E4CC'
    alt="pizza"
    />
    <button className='md-button aboutUs-button'
     onClick={routeToOrder}>
     Order Here
    </button>
</div>


)
}