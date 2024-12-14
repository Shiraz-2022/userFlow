import React, { useState, useEffect } from "react";

// Components
import UsersListTopBar from "../components/UsersListTopBar";
import GradientCircle from "../components/microComponents/GradientCircle";
import CustomDialog from "../components/dialogs/CustomDialog";

// Images
import backArrowIcon from "../assets/images/backArrowIcon.svg";
import successAnimation from "../assets/images/successAnimation.gif";
import failure from "../assets/images/failure.svg";

// APIs
import { fetchUsers } from "../api/fetchUsers";
import { deleteUser, updateUser } from "../api/user";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [checkedRows, setCheckedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await fetchUsers(currentPage);
        setUsers(data.data);
        setFilteredUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, [currentPage]);

  useEffect(() => {
    let updatedUsers = [...users];

    if (searchQuery) {
      updatedUsers = updatedUsers.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "name") {
      updatedUsers.sort((a, b) => a.first_name.localeCompare(b.first_name));
    }

    setFilteredUsers(updatedUsers);
  }, [searchQuery, sortOption, users]);

  const handleCheckboxChange = (id) => {
    setCheckedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleDelete = async () => {
    try {
      const checkedUserIds = Object.keys(checkedRows).filter(
        (id) => checkedRows[id]
      );

      if (checkedUserIds.length === 0) {
        setDialogMessage("No users selected for deletion.");
        setIsErrorDialogOpen(true);
        return;
      }

      await Promise.all(checkedUserIds.map(async (id) => await deleteUser(id)));

      setUsers(
        users.filter((user) => !checkedUserIds.includes(user.id.toString()))
      );
      setFilteredUsers(
        users.filter((user) => !checkedUserIds.includes(user.id.toString()))
      );
      setCheckedRows({});

      setDialogMessage("Selected users deleted successfully.");
      setIsSuccessDialogOpen(true);
    } catch (error) {
      console.error("Error deleting users:", error);
      setDialogMessage("Failed to delete selected users.");
      setIsErrorDialogOpen(true);
    }
  };

  const handleUpdate = async (updatedUser, closeForm) => {
    try {
      const checkedUserIds = Object.keys(checkedRows).filter(
        (id) => checkedRows[id]
      );

      await updateUser(checkedUserIds[0], updatedUser);
      console.log("updateUser", updatedUser);
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setDialogMessage("Selected user updated successfully.");
      closeForm();
      setIsSuccessDialogOpen(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setDialogMessage("Failed to update selected user.");
      setIsErrorDialogOpen(true);
    }
  };

  const openForm = () => {
    const checkedUserIds = Object.keys(checkedRows).filter(
      (id) => checkedRows[id]
    );

    if (checkedUserIds.length === 0) {
      setDialogMessage("No users selected for deletion.");
      setIsErrorDialogOpen(true);
      return null;
    } else if (checkedUserIds.length > 1) {
      setDialogMessage("Select one user at a time.");
      setIsErrorDialogOpen(true);
      return null;
    }

    const selectedUserId = checkedUserIds[0];
    console.log("id", users);
    const userDetails = users.find((user) => user.id == selectedUserId);

    console.log("userDetails", userDetails);

    return userDetails;
  };

  return (
    <div className="px-20 py-10 flex flex-col gap-10 h-screen max-tablet_lg:p-10">
      {isSuccessDialogOpen && (
        <CustomDialog
          text={dialogMessage}
          onClose={() => setIsSuccessDialogOpen(false)}
          icon={successAnimation}
        />
      )}

      {isErrorDialogOpen && (
        <CustomDialog
          text={dialogMessage}
          onClose={() => setIsErrorDialogOpen(false)}
          icon={failure}
        />
      )}

      <GradientCircle />
      <UsersListTopBar
        onSearch={setSearchQuery}
        onSort={setSortOption}
        handleDelete={handleDelete}
        openForm={openForm}
        handleUpdate={handleUpdate}
      />
      <div className="w-full bg-white rounded-md text-customBlack  relative z-2 overflow-scroll">
        <table className="w-full border-collapse">
          <thead className="rounded-md text-sm">
            <tr>
              <th className="p-3 text-left"> </th>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`border-t border-t-customLightGray last:border-b last:border-b-customLightGray ${
                  checkedRows[user.id] ? "bg-customLightGreen" : ""
                }`}
              >
                <td className="p-3 text-center flex gap-5">
                  <input
                    type="checkbox"
                    className="cursor-pointer text-white accent-customGreen ml-3"
                    onChange={() => handleCheckboxChange(user.id)}
                    checked={!!checkedRows[user.id]}
                  />
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full max-tablet_lg:mx-7"
                  />
                </td>
                <td className="p-3">{user.first_name}</td>
                <td className="p-3">{user.last_name}</td>
                <td className="p-3">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mx-auto w-fit justify-center items-center my-5 border border-customLightGray rounded-md text-sm">
          <button
            className={`px-4 py-2 flex items-center gap-3 ${
              currentPage === 1 && "text-customGray"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <img src={backArrowIcon} alt="back-arrow" className="w-5 h-5" />
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2   ${
                  currentPage === index + 1 && "bg-customLightGreen"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className={`px-4 py-2 flex items-center gap-3 ${
              currentPage === totalPages && "text-customGray"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
            <img
              src={backArrowIcon}
              alt="back-arrow"
              className="rotate-180 w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
