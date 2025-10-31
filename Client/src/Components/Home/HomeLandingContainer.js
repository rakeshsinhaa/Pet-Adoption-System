import React from "react";
// import girlHoldingADog from "./images/girlHoldingADog.png";
import adoptMe from "./images/adoptMe.png";
import homepageDog from "./images/homepageDog.png";
import footPrint from "./images/footPrint.png";
import leftPets from "./images/leftPets.png";

import { Link } from "react-router-dom";

const HomeLandingContainer = (props) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="home-container">
      <div className="homeContainer-left">
        <div>
          <div className="home-title">
            <div
              className="home-titlePlusPng"
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
            >
              <img
                src={leftPets}
                alt="Dog sitting"
                style={{ width: "50vh",}}
              />
              <p style={{ margin: 0 }}>Happy Pets</p>
            </div>

            <p style={{ margin: 0 }}>Happy</p>
            <p style={{ margin: 0 }}>Home</p>
          </div>
          <p className="home-second-para">
            Get your hugs, cuddles, and treats ready they’re coming home!
          </p>
        </div>
        <div className="adopt-btn">
          <Link to='./pets'><button className="Home-button" onClick={scrollToTop}><p>Adopt a Pet</p><img src={footPrint} alt="footprint" /></button></Link>
        </div>
      </div>
      <div className="homeContainer-right">
        <img src={adoptMe} alt='adopt me' style={{ height: "65vh" }} />
      </div>
    </div>
  );
};

export default HomeLandingContainer;
