import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(emailOrPhone, password)
      .then((response) => {
        console.log(response.ok);
        if (response.ok) {
          alert("Login Successful!");
          navigate("/success");
        } else {
          setError("Login failed. Wrong email or password.");
          console.log("Login Failed:", response.message);
        }
      })
      .catch((error) => {
        console.error("Login Failed:", error);
        setError("Login failed");
      });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    alert("Google Login Successful!");
    navigate("/success");
  };

  const handleGoogleFailure = () => {
    console.error("Google Login Failed");
    setError("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="920285886677-sdrd539vgvciuk4tu3q6okggvvdad963.apps.googleusercontent.com"> {/* Replace with your Google Client ID */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div
          style={{
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "24rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Login
          </h1>
          {error && (
            <p
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              type="text"
              placeholder="Email or Phone Number"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                outline: "none",
              }}
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                outline: "none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              color: "#4b5563",
            }}
          >
            Or
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap // Optional: Enables Google One Tap login
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}