import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Login(PaperProps) {
  const [loading, setLoading] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState({
    visible: false,
    type: "",
    message: "",
  });
  const Navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/login", values);
      setNotificationVisible({
        title: "LoggedIn successfully",
        visible: true,
        color: "green",
        icon: <IconCheck />,
        message: `Welcome ${data.name}`,
      });
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        Navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err.response);
      setNotificationVisible({
        title: "Something went wrong",
        visible: true,
        color: "red",
        icon: <IconX />,
        message: err.response.data.msg,
      });
    }
    setLoading(false);
    setTimeout(() => {
      setNotificationVisible({
        visible: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="login">
      {notificationVisible.visible && (
        <Notification
          style={{ zIndex: 1000, position: "fixed", top: 20, right: 20 }}
          title={notificationVisible.title}
          color={notificationVisible.color}
          icon={notificationVisible.icon}
          onClose={() =>
            setNotificationVisible({
              visible: false,
              type: "",
              message: "",
            })
          }
          withCloseButton
        >
          {notificationVisible.message}
        </Notification>
      )}
      <Paper
        radius="md"
        p="xl"
        withBorder
        sx={{
          width: "100%",
          maxWidth: 450,
        }}
      >
        <Text size="lg" weight={500}>
          Welcome to Inked Pages
        </Text>

        <Divider my="lg"></Divider>

        <form
          onSubmit={form.onSubmit((value) => {
            handleSubmit(value);
            // form.reset();
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" size="xs">
              New to Inked Pages? <NavLink to="/register">Register</NavLink>
            </Anchor>
            <Button type="submit" radius="xl">
              {loading ? <Loader color="orange" variant="dots" /> : "Login"}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
