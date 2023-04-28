import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button, Box, Modal } from "@mantine/core";
import React from "react";

const AppModal = ({ opened, setOpened, title, form, type, submitFunction }) => {
  return (
    <>
      <Modal
        opened={opened}
        centered
        title={title}
        onClose={() => setOpened(false)}
        closeOnEscape={false}
        closeOnOverlayClick={false}
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
              submitFunction(value);
            })}
          >
            <TextInput
              label="Title"
              placeholder="Add a title"
              {...form.getInputProps("title")}
            />
            <TextInput
              mt="sm"
              label="Description"
              placeholder="Add a description"
              {...form.getInputProps("desc")}
            />
            <Button type="submit" mt="lg" fullWidth>
              {type === "add" ? "Post" : "Update"}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AppModal;
