import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
      });

      login(res.data.token);
      navigate("/posts");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Register</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={submit}>
          <input
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button">Register</button>
        </form>

        <div className="link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
