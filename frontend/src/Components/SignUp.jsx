import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { toast } from "react-toastify";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/signup", form);
      toast.success("Welcome to the community!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.err || "Signup failed");
    }
  };

  return (
    /* Changed to standard linear gradient for better compatibility */
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 px-4 py-10">
      
      <div className="relative w-full max-w-[450px]">
        {/* Glow Effects - Using simpler opacity */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-rose-400 opacity-20 blur-3xl rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-amber-400 opacity-20 blur-3xl rounded-full" />

        <form
          onSubmit={handleSignup}
          className="relative bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white flex flex-col gap-5"
        >
          <div className="text-center space-y-2 mb-2">
            <h1 className="text-4xl font-black text-rose-600 tracking-tight">
              Join Us!
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-gray-400"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-gray-400"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-gray-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-white border border-rose-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="w-full mt-2 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-rose-200 transition-all duration-300 active:scale-95"
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already a member?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-rose-600 font-bold cursor-pointer hover:underline transition-colors"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;