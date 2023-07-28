import { useForm } from "@mantine/form";
import {
  NumberInput,
  Textarea,
  TextInput,
  Button,
  Box,
  Loader,
  Modal,
} from "@mantine/core";
import React from "react";

const AppModal = ({
  opened,
  setOpened,
  title,
  form,
  type,
  submitFunction,
  loading,
}) => {
  return (
    <>
      <Modal
        opened={opened}
        centered
        title={title}
        onClose={() => setOpened(false)}
        closeOnEscape={false}
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
            <Textarea
              minRows={4}
              maxRows={6}
              mt="sm"
              label="Description"
              placeholder="Add a description"
              {...form.getInputProps("desc")}
            />
            <Button type="submit" mt="lg" fullWidth>
              {loading ? (
                <Loader color="white" variant="dots" />
              ) : type === "add" ? (
                "Post"
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AppModal;
