import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const Navigate = useNavigate();

  const getUser = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const { data } = await axios.get("/auth/verify", config);
      setUser(data);
    } catch (err) {
      localStorage.removeItem("token");
      Navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome {user.name}</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
