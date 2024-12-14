import React, { useState } from "react";

// components
import CarouselButton from "./microComponents/CarouselButton";

// styles
import "../styles/customShapes.css";

//constants
import { testimonials } from "../constants";

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div className="flex gap-5 my-10 ml-5 max-phone:ml-0">
        <CarouselButton onClick={nextTestimonial} />
        <CarouselButton color="white" onClick={nextTestimonial} />
      </div>

      <div className="bg-white rounded-md ml-5 px-5 py-7 flex flex-col gap-10 inverted-radius relative transition-transform duration-500 ease-in-out max-laptop:gap-3 max-phone:ml-0 max-phone:gap-7">
        <p className="text-customBlack font-bold text-xl w-2/3 max-laptop:text-lg max-laptop:w-4/5">
          Discover what our users have to say about their experience with this
          platform.
        </p>

        <div className="flex justify-between align-middle">
          <p
            key={currentIndex}
            className="text-customBlack text-sm w-4/5 animate-fade"
          >
            {testimonials[currentIndex].text}
          </p>
          <img
            src={testimonials[currentIndex].image}
            alt={`User ${currentIndex + 1}`}
            className="w-12 h-12 rounded-full mr-7 animate-fade"
          />
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
