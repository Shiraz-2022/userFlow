import React, { useState } from "react";
import "../styles/customShapes.css";
import CustomButton from "./microComponents/CustomButton";
import CustomInput from "./microComponents/CustomInput";

const EditForm = (props) => {
  const { handleUpdate, userDetails } = props;

  const [firstName, setFirstName] = useState(userDetails?.first_name || "");
  const [lastName, setLastName] = useState(userDetails?.last_name || "");
  const [email, setEmail] = useState(userDetails?.email || "");

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedUserDetails = {
      ...userDetails,
      first_name: firstName,
      last_name: lastName,
      email,
    };

    handleUpdate(updatedUserDetails);
  };

  return (
    <div
      className="bg-customGreen p-6 rounded-lg shadow-md inverted-radius w-1/4 max-laptop:w-1/2 max-phone:w-full max-phone:mx-2"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-8">Edit details</h2>

      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <CustomInput
          textColor="#040404"
          label="First name"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <CustomInput
          textColor="#040404"
          label="Last name"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <CustomInput
          textColor="#040404"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mt-12">
          <CustomButton
            textColor="#FFFFFF"
            bgColor="#FC904E"
            text="Update"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
