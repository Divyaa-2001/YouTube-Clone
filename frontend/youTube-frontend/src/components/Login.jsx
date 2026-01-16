import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ server: data.msg || "Login failed" });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");

    } catch (err) {
      console.error(err);
      setErrors({ server: "Cannot connect to server" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: "", server: "" });
              }}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => {
                setForm({ ...form, password: e.target.value });
                setErrors({ ...errors, password: "", server: "" });
              }}
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {errors.server && (
            <p className="text-red-500 text-sm text-center">{errors.server}</p>
          )}

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md">
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span className="text-red-600 cursor-pointer" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </div>
  );
}
