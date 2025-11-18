// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
// src/pages/Login.jsx

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ email: form.email, password: form.password })
      console.log(data)
      navigate()
    }
    catch (err) {
      console.log("error")
    }
    finally {

    }
    // try {
    //   const res = await api.post("/api/auth/login", form);
    //   const { token, user } = res.data;

    //   if (!token) throw new Error("No token returned from server");

    //   localStorage.setItem("token", token);
    //   localStorage.setItem("user", JSON.stringify(user));

    //   navigate("/ai/dashboard", { replace: true });
    // } catch (err) {
    //   console.error(err);
    //   setError(err.response?.data?.message || err.message || "Login failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Log into your account</p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.footerText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e2e8f0, #f7fafc)",
    padding: "1rem",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    background: "#fff",
    padding: "2rem",
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#666",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.9rem",
    background: "#4F46E5",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "500",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.3s",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "1rem",
  },
  footerText: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  link: {
    color: "#4F46E5",
    textDecoration: "none",
    fontWeight: "500",
  },
};
