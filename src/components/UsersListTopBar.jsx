import { useState } from "react";

//components
import SearchBar from "./microComponents/SerachBar";
import CustomIconButton from "./microComponents/CustomIconButton";
import EditForm from "./EditForm";

// Images
import expandArrowIcon from "../assets/images/expandArrowIcon.svg";
import editIcon from "../assets/images/editIcon.svg";
import trashIcon from "../assets/images/trashIcon.svg";

function UsersListTopBar(props) {
  const { onSearch, onSort, handleDelete, openForm, handleUpdate } = props;

  const [dropdown, setDropdown] = useState(false);
  const [activeSort, setActiveSort] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleSort = (label) => {
    onSort(label.toLowerCase());
    setActiveSort(label);
    setDropdown(false);
  };

  const removeSort = () => {
    setActiveSort(null);
    onSort(null);
  };

  const openEditForm = () => {
    const user = openForm();
    if (user) {
      setUserDetails(user);
      setIsEditOpen(true);
    }
  };

  const closeEditForm = () => {
    setIsEditOpen(false);
  };

  const handleUpdateCallback = async (updatedUser) => {
    await handleUpdate(updatedUser, closeEditForm);
  };

  return (
    <div className="relative z-3">
      <div className="flex justify-between">
        <div className="flex gap-7 align-middle max-tablet_lg:flex-col">
          <div className="w-72 max-tablet_lg:w-48">
            <SearchBar
              text="Search users"
              bgColor="#FFFFFF"
              color="#717170"
              onSearch={onSearch}
            />
          </div>

          <div
            className="w-fit relative"
            onClick={() => setDropdown(!dropdown)}
          >
            {dropdown ? (
              <div>
                <CustomIconButton
                  text="Sort by"
                  textColor="#43B17F"
                  bgColor="#FFFFFF"
                  icon={expandArrowIcon}
                />
                <div className="w-full absolute z-3 -bottom-full left-0 rounded-md bg-customGreen flex flex-col">
                  {["Name"].map((label) => (
                    <div
                      key={label}
                      onClick={() => handleSort(label)}
                      className="text-white cursor-pointer px-3 py-2 hover:bg-opacity-80 hover:bg-white hover:text-customGreen transition-all rounded-md"
                    >
                      <p>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <CustomIconButton
                text="Sort by"
                textColor="#FFFFFF"
                bgColor="#43B17F"
                icon={expandArrowIcon}
              />
            )}
          </div>

          {activeSort && (
            <div className="flex items-center ml-4 bg-gray-200 rounded-md px-3 py-2 bg-white justify-between w-fit text-customGreen max-tablet_lg:ml-0">
              <span>{activeSort}</span>
              <button
                onClick={removeSort}
                className="ml-3 text-red-500 font-bold"
              >
                ✖
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-7 max-tablet_lg:flex-col items-end">
          <div className="w-fit" onClick={openEditForm}>
            <CustomIconButton
              text="Edit"
              textColor="#FFFFFF"
              bgColor="#43B17F"
              icon={editIcon}
              reverse={true}
            />
          </div>

          <div className="w-fit">
            <CustomIconButton
              textColor="#FFFFFF"
              bgColor="#FC904E"
              icon={trashIcon}
              reverse={true}
              hideText={true}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div
          className="fixed inset-0 bg-customBlack bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeEditForm}
        >
          <EditForm
            handleUpdate={handleUpdateCallback}
            userDetails={userDetails}
          />
        </div>
      )}
    </div>
  );
}

export default UsersListTopBar;
