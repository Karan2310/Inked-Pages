import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "@mantine/core";
import ScreenTabs from "../components/ScreenTabs";
import AddBlog from "../components/AddBlog";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const Navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const getBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/blogs");
      setBlogs(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const [cookies, removeCookie, removeCookies] = useCookies([
    "token",
    "userId",
  ]);

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
    <div className="dashboard ">
      <div
        className="d-flex justify-content-between  align-items-center p-4 shadow"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <h2 className="fw-semibold">Inked Pages</h2>
        <Button
          radius="md"
          onClick={() => {
            removeCookie("token");
            removeCookie("userId");
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>
      </div>
      <div className="main-body p-4 mt-3">
        <h3>
          Welcome <span className="text-primary fw-semibold">{user.name},</span>
        </h3>
        <div className="mt-4">
          <ScreenTabs
            getBlogs={getBlogs}
            blogs={blogs}
            fetch={fetch}
            loading={loading}
          />
        </div>
      </div>
      <AddBlog fetch={fetch} setFetch={setFetch} />
    </div>
  );
};

export default Dashboard;
