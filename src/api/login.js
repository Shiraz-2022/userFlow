export const login = async (email, password) => {
  try {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log("Login successful, token:", data.token);
      return null;
    } else {
      return data.error || "Invalid credentials";
    }
  } catch (err) {
    console.error("Login error:", err);
    return "Something went wrong. Please try again.";
  }
};
