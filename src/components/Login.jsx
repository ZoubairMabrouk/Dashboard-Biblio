import React, { useState } from "react";
import { login } from "../services/auth";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = {
        username: UserName,
        password: Password,
      };
      console.log({ UserName:UserName, Password:Password });

      const response = await login(user);
      console.log("Login successful:", response);

      localStorage.setItem("token", response.token);

      console.log("Login successful:", response);
      window.location.href = "/dashboard";
      
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="text-primary">Welcome Back !</h2>
      <h4 className="text-success">Login and Take Your Book</h4>
      {error && <p className="error-message text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>UserName</label>
          <input
            type="text"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
