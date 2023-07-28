import React, { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import AppModal from "./AppModal";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { SERVER_URL } from "../config";

const AddBlog = ({ fetch, setFetch }) => {
  const [opened, setOpened] = useState(false);
  const [cookies] = useCookies(["userId"]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: { title: "", desc: "" },

    validate: {
      title: (value) => (value.trim().length < 2 ? "Title too Short" : null),
      desc: (value) =>
        value.trim().length < 2 ? "Please add more description" : null,
    },
  });

  const addBlog = async (value) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/blogs/${cookies.userId}`,
        value
      );
      setFetch(!fetch);
    } catch (err) {
      alert("Error adding blog, try again");
      console.log(err);
    }
    setLoading(false);
    setOpened(false);
    form.reset();
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
        loading={loading}
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
