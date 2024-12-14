export const deleteUser = async (id) => {
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return await response.json();
};
