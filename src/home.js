import React from "react";
import { useHistory } from "react-router-dom";

export default function Home() {

  const history = useHistory();

  const routeToAbout = () => {
 
    console.log(history);
    history.push("/about");
  };

  return (
    <div className="home-wrapper">
      <img
        className="home-image"
        src=""
        alt=""
      />
      <button onClick={routeToAbout} className="md-button shop-button">
        About Us
      </button>
    </div>
  );
}
