import React from "react";

//images
import arrowWhite from "../../assets/images/arrowWhite.png";
import arrowGreen from "../../assets/images/arrowGreen.png";

function CarouselButton(props) {
  const { color, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`p-2 ${
        color === "white" ? "bg-customDarkGreen" : "bg-customLightGreen"
      } w-16 h-12 flex justify-center align-middle rounded-md`}
    >
      {color === "white" ? (
        <img src={arrowWhite} alt="arrow-white" />
      ) : (
        <img src={arrowGreen} alt="arrow-green" />
      )}
    </button>
  );
}

export default CarouselButton;
