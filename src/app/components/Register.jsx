import React, { useState } from "react";
import Input from "./Input";
import {Button} from "./Button";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/register", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl border border-border p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl text-center">Create Account</h1>

        <form onSubmit={submit} className="space-y-5">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
      </div>
    </div>
  );
}
