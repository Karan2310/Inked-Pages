import React, { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import AppModal from "./AppModal";
import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button, Box } from "@mantine/core";
import axios from "axios";
import { useCookies } from "react-cookie";

const AddBlog = ({ fetch, setFetch }) => {
  const [opened, setOpened] = useState(false);
  const [cookies] = useCookies(["userId"]);
  const form = useForm({
    initialValues: { title: "", desc: "" },

    validate: {
      title: (value) => (value.length < 2 ? "Title too Short" : null),
      desc: (value) =>
        value.length < 2 ? "Please add more description" : null,
    },
  });

  const addBlog = async (value) => {
    try {
      const { data } = await axios.post(`/blogs/${cookies.userId}`, value);
      setFetch(!fetch);
      alert("Blog Added");
      form.reset();
      setOpened(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary d-flex align-items-center justify-content-center position-fixed bottom-0 end-0 m-4 shadow"
        style={{ borderRadius: "50%", height: "50px", width: "50px" }}
        onClick={() => setOpened(true)}
      >
        <IconPlus size={30} />
      </button>
      <AppModal
        opened={opened}
        setOpened={setOpened}
        title="Add a Blog"
        form={form}
        type="add"
        submitFunction={addBlog}
      />
    </>
  );
};

export default AddBlog;
