import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RegisterStudent() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register("", email, password, "student");
      navigate("/student/onboarding");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center p-6
        bg-gradient-to-br from-[#6A11CB] via-[#4B34C9] to-[#2575FC]
      "
    >
      <form
        onSubmit={submit}
        className="
          w-full max-w-md p-8 rounded-2xl space-y-5
          bg-white/95
          backdrop-blur-2xl
          border border-white/50
          shadow-2xl shadow-black/20
          animate-[popup_.5s_ease]
        "
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Registration
        </h2>
        <p className="text-center text-sm text-gray-500 -mt-3">Create your student account</p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="
            w-full p-3 rounded-lg
            bg-gray-50
            border border-gray-200
            text-gray-800
            focus:outline-none focus:ring-2 focus:ring-[#6A11CB]/40
            transition
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="
              w-full p-3 rounded-lg pr-12
              bg-gray-50
              border border-gray-200
              text-gray-800
              focus:outline-none focus:ring-2 focus:ring-[#6A11CB]/40
              transition
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Continue Button */}
        <button
          className="
            w-full py-3 rounded-lg font-semibold
            bg-gradient-to-r from-[#6A11CB] to-[#2575FC]
            text-white
            hover:shadow-lg hover:shadow-[#6A11CB]/30
            transition-all duration-200
            active:scale-95
          "
        >
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-200" />
          OR
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Button (UI only) */}
        <button
          type="button"
          className="
            w-full py-3 rounded-lg font-medium
            bg-white text-gray-700
            border border-gray-200
            hover:bg-gray-50
            transition
          "
        >
          Sign in with Google
        </button>
      </form>

      {/* animation */}
      <style>
        {`
          @keyframes popup {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}
