import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("firstName", res.data.firstName);
      toast.success("Welcome back!");
      navigate("/gallery");
    } catch (err) {
      toast.error(err.response?.data?.err || "Login failed");
    }
  };

  return (
    /* Using standard linear gradient from Rose to Amber */
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 px-4">
      
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl shadow-rose-200/50 border border-white flex flex-col gap-6"
        >
          <div className="text-center">
            <h1 className="text-4xl font-black text-rose-600 tracking-tight mb-2">
              Welcome User!
            </h1>
           
          </div>

          <div className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-gray-400"
            />

            <div className="relative">
  <input
    name="password"
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    required
    onChange={handleChange}
    className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 pr-12 outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-gray-400"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-rose-500"
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>
</div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 active:scale-95"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-rose-500 font-bold cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;