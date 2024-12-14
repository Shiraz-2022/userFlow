export const fetchUsers = async (page) => {
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return console.error("Error fetching users:", error);
  }
};
