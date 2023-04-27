import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const Navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const getUser = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
          "x-auth-token": cookies.token,
        },
      };
      const { data } = await axios.get("/auth/verify", config);
      setUser(data);
    } catch (err) {
      removeCookie("token");
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
          removeCookie("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
