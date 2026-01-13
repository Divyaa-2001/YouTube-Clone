import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "User registered successfully") {
          alert("Registered!");
          navigate("/login");
        } else {
          alert(data.message || "Error");
        }
      })
      .catch(() => alert("Server error"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
    
    <h2 className="text-2xl font-bold text-center mb-6">
      Create Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <input
        type="email"
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
      >
        Register
      </button>

    </form>

    <p className="text-center text-sm mt-4">
      Already have an account?{" "}
      <span
        className="text-red-600 cursor-pointer font-medium"
        onClick={() => navigate("/login")}
      >
        Login
      </span>
    </p>

  </div>
</div>

  );
}
