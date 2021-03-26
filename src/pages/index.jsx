import React from "react";

import { useHistory } from "react-router-dom"

const MainPage = () => {
    const history = useHistory();

    const routeToOrder = () => {
        console.log(history)
        history.push("/pizza-order");
    }
     return(
        <div className = "home-wrapper">
            <img   
                className="home-image"
                src="Assets/Pizza.jpg"
                alt="pizza header"

                />
            <button onClick={routeToOrder} className="md-button shop-button "> Home Page
            Place Your Order
            </button>
        </div>
  );
};
export default MainPage;