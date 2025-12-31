import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/posts";
import { useAuth } from "./context/useAuth";

console.log("APP RENDERED");


export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/posts" />}
      />

      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/posts" />}
      />

      <Route
        path="/posts"
        element={token ? <Posts /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
