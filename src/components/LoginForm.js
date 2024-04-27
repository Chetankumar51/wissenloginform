import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../assets/download.png';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid username/password");
      }
      const { token } = await response.json();
      localStorage.setItem("token", token);
      // history.push('/user-list');
      toast.success("Login successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login_main">
      <img
        src={loginImage}
        alt="Login Image"
      />
      <h4>Hello there, Sign In to Continue</h4>
      {error && <p>{error}</p>}
      <form className="form_wrapper" onSubmit={handleSubmit}>
        <div className="form_div">
          <p className="label_title">Email</p>
          <input
            className="input_style"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form_div">
          <p className="label_title">Password</p>
          <input
            className="input_style"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ width: "290px", margin: "20px 0" }}>
          <input type="checkbox" />{" "}
          <span>
            By creating an logging into an account, you are agreeing with our
            Tearms and Conditions and Privacy Policys{" "}
          </span>
        </div>
        <button className="button_next" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
