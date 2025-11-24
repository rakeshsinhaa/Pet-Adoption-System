import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Force a re-render or state update to show AdminPanel
        // For now, we can reload or use a parent state if available.
        // Based on previous code, it seems this component switches view locally.
        // But better to check if we can lift state or just use the local success state.
        // The previous code used `loginSuccess` state.
        setLoginSuccess(true);
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setShowErrorMessage(true);
    }
  };

  // We need to keep the state for view switching
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoginSuccess(true);
    }
  }, []);

  return (
    <div>
      {loginSuccess ? (
        <AdminPanel />
      ) : (
        <div className="login-body">
          <div className="login-container">
            <h2>Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showErrorMessage && (
              <p className="error-message">Incorrect username or password</p>
            )}
            <button className="float-right" onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
