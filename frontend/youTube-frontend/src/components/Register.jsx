import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Empty validation
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

    if (form.password && !strongPassword.test(form.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number & special character";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // API Call
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg || data.message) {
          if (data.msg?.includes("success") || data.message?.includes("success")) {
            navigate("/login");
          } else {
            setErrors({ server: data.msg || data.message });
          }
        }
      })
      .catch(() => setErrors({ server: "Server error" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={e => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {errors.server && (
            <p className="text-red-500 text-sm text-center">{errors.server}</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-red-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

