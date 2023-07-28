import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "@mantine/core";
import ScreenTabs from "../components/ScreenTabs";
import { IconEdit } from "@tabler/icons-react";
import AddBlog from "../components/AddBlog";
import { SERVER_URL } from "../config";
import { ActionIcon, Modal, Box, TextInput, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const Navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { name: "" },

    validate: {
      name: (value) => (value.length < 2 ? "Title too Short" : null),
    },
  });

  const getBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${SERVER_URL}/blogs`);
      setBlogs(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const [cookies, removeCookie] = useCookies(["token", "userId"]);

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
      const { data } = await axios.get(`${SERVER_URL}/auth/verify`, config);
      setUser(data);
    } catch (err) {
      removeCookie("token");
      alert("You have been logged out!");
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
        <div className="d-flex align-items-center">
          <h3>
            Welcome{" "}
            <span className="text-primary fw-semibold">{user.name},</span>
          </h3>
          <ActionIcon>
            <IconEdit
              size="1.2rem"
              color={"#0C6DFD"}
              stroke={1.5}
              className="ms-2"
              cursor={"pointer"}
              onClick={() => {
                form.setValues({ name: user.name });
                open();
              }}
            />
          </ActionIcon>
        </div>
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
      <Modal
        centered
        opened={opened}
        onClose={close}
        title="Edit Profile"
        radius={10}
        sx={{
          ".mantine-1k9itrp": {
            fontSize: "1.2rem",
            fontWeight: 600,
          },
        }}
      >
        <Box mx="auto">
          <form
            onSubmit={form.onSubmit((value) => {
              console.log(value);
              // submitFunction(value);
            })}
          >
            <TextInput
              label="Name"
              placeholder="Add your name"
              {...form.getInputProps("name")}
            />
            <Button type="submit" mt="lg" fullWidth>
              {loading ? <Loader color="white" variant="dots" /> : "Update"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
