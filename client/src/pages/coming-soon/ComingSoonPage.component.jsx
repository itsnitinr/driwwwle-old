import React from "react";

import Navbar from "../../components/navbar/Navbar.component";
import Footer from "../../components/footer/Footer.component";
import { ReactComponent as ComingSoonImage } from "../../assets/images/coming-soon.svg";

import "./ComingSoonPage.styles.css";

const ComingSoonPage = () => {
  return (
    <>
      <Navbar />
      <div id="coming-soon" className="container px-5">
        <div>
          <ComingSoonImage id="coming-soon-image" />
        </div>
        <h1 className="mt-5">
          Hang in there ! We're working on some exciting features.
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoonPage;
