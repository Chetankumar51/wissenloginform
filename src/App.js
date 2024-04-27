import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <LoginForm />
      <UserList />
      <ToastContainer />
    </div>
  );
}

export default App;
