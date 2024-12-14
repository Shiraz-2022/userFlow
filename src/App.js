import { Routes, Route, Navigate } from "react-router-dom";

//Pages
import Auth from "./pages/Auth";
import UsersList from "./pages/UsersList";

//context
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={isSignedIn ? <Navigate to="/users" replace /> : <Auth />}
      />
      <Route
        path="/users"
        element={isSignedIn ? <UsersList /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
