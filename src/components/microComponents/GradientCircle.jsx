import React from "react";

//images
import gradient from "../../assets/images/gradient.svg";

function GradientCircle() {
  return (
    <div>
      <img
        className="absolute z-1 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        src={gradient}
        alt="gradient"
      />
    </div>
  );
}

export default GradientCircle;
