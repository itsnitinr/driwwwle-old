import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <img
    src={spinner}
    style={{ display: "block", width: "200px", margin: "auto" }}
    alt="Loading..."
  />
);

export default Spinner;
