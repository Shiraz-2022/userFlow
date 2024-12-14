import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import CustomInput from "../components/microComponents/CustomInput";
import CustomButton from "../components/microComponents/CustomButton";
import Testimonial from "../components/Testimonial";
import GradientCircle from "../components/microComponents/GradientCircle";

//styles
import "../styles/customShapes.css";

//apis
import { login } from "../api/login";
import { AuthContext } from "../contexts/AuthContext";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsSignedIn } = useContext(AuthContext);

  const handleLogin = async () => {
    setError("");
    const error = await login(email, password);
    if (!error) {
      setIsSignedIn(true);
      navigate("/users");
    } else {
      setError(error);
    }
  };

  return (
    <div className="px-20 py-10 flex justify-center relative w-full max-laptop:px-10 max-tablet_lg:flex-col max-tablet_lg:p-20 phone:h-screen phone:w-screen phone:overflow-hidden max-phone:px-7">
      <GradientCircle />
      <div className="w-1/2 relative z-2 max-tablet_lg:mb-20 max-tablet_lg:flex max-tablet_lg:w-full max-tablet_lg:items-start max-phone:flex-col">
        <div className="flex flex-col gap-10 mb-12 max-tablet_lg:w-2/3 max-phone:w-full">
          <em className="text-white font-bold text-4xl max-laptop:text-3xl">
            User Flow
          </em>
          <p className="w-2/3 text-lg max-laptop:text-sm max-phone:w-full">
            Managing users is a breeze with this app—log in and edit details
            with just a few clicks.
          </p>
        </div>
        <div className="flex flex-col gap-10 max-tablet_lg:w-1/2 max-phone:w-full">
          <div className="w-2/3 flex flex-col gap-7 max-laptop:gap-3 max-tablet_lg:w-full">
            <CustomInput
              label="Email"
              type="email"
              textColor="#040404"
              placeholder="Enter your email"
              placeholderColor="#717170"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <CustomInput
              label="Password"
              type="password"
              textColor="#040404"
              placeholder="Enter your password"
              placeholderColor="#717170"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="w-2/3 mt-10 max-laptop:mt-5 max-tablet_lg:w-full">
            <CustomButton
              text="Sign in"
              textColor="#ffffff"
              bgColor="#43B17F"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-customGreen rounded-md py-10 px-7 relative z-2 inverted-radius max-laptop:w-2/3 max-laptop:py-5 max-tablet_lg:w-full max-phone:bg-transparent max-phone:p-0">
        <div className="flex flex-col gap-3 max-laptop:gap-1 max-phone:hidden">
          <p className="font-bold text-4xl ml-5 w-4/5 max-laptop:text-3xl">
            Trusted By Users Worldwide.
          </p>
          <p className="font-bold text-6xl max-laptop:text-4xl">"</p>
          <p className="ml-5 w-2/3 max-laptop:w-4/5">
            This app simplifies user management. Logging in and editing details
            is so easy.
          </p>
        </div>
        <Testimonial />
      </div>
    </div>
  );
}

export default Auth;
