import React from 'react'
import { useHistory } from 'react-router-dom';


export default function Home(){


const history = useHistory()

    const routeToAboutUs = () => {
    history.push('/about-us')
}

return (
<div className='home-wrapper'>
    <img className='home-image'
    src='https://www.performancefoodservice.com/-/media/PFS/Recipes/Hero---Full-Width/performancefoodservice-recipes-hearty-pizza_heroFull.jpg?h=966&w=2302&la=en&hash=B1691FC60983D414E23752A7DFE1E4CC'
    alt="pizza"
    />
    <button className='md-button aboutUs-button'
     onClick={routeToAboutUs}>
     Learn About Us
    </button>
</div>


)
}