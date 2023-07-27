import React, { useState } from "react";
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
} from "@mantine/core";
import {
  IconHeart,
  IconBookmark,
  IconShare,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Grid } from "@mantine/core";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useForm } from "@mantine/form";
import AppModal from "./AppModal";
import { SERVER_URL } from "../config";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

const BlogCard = ({
  id,
  title,
  authorName,
  createdAt,
  desc,
  authorId,
  getBlogs,
  updatedAt,
  isEdited,
}) => {
  const [cookies] = useCookies(["userId"]);
  const { classes, theme } = useStyles();

  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: { title: "", desc: "" },

    validate: {
      title: (value) => (value.length < 2 ? "Title too Short" : null),
      desc: (value) =>
        value.length < 2 ? "Please add more description" : null,
    },
  });

  const deletePost = (postId) => {
    try {
      axios.delete(`${SERVER_URL}/blogs/${postId}`);
      alert("Blog deleted successfully");
      // window.location.reload();
      getBlogs();
    } catch (error) {
      console.log(error);
      alert("Error deleting blog");
    }
  };

  const updatePost = async (value) => {
    try {
      const { data } = await axios.put(`${SERVER_URL}/blogs/${id}`, value);
      alert("Blog Updated");
      getBlogs();
    } catch (err) {
      console.log(err);
      alert("Error updating blog, try again");
    }
    form.reset();
    setOpened(false);
  };

  return (
    <Grid.Col md={6} lg={3}>
      <Card withBorder padding="lg" radius="md" className={classes.card}>
        <Card.Section mb="sm">
          {/* <Image src={image} alt={title} height={180} /> */}
        </Card.Section>

        {/* <Badge>Hhh</Badge> */}

        <Group position="apart" mt="md">
          <Text fw={700} className={classes.title} maw={"70%"}>
            {title}
          </Text>
          {isEdited && <Badge size="sm">Edited</Badge>}
        </Group>

        <Group mt="lg">
          {/* <Avatar src={author.image} radius="sm" /> */}
          <div>
            <Text fw={500}>{desc}</Text>
            <Text fz="xs" c="dimmed">
              Created By : {authorName}
            </Text>
          </div>
        </Group>

        <Card.Section className={classes.footer}>
          <Group position="apart">
            <Text fz="xs" c="dimmed">
              {createdAt}
            </Text>
            <Group spacing={10}>
              {/* <ActionIcon>
                <IconBookmark
                  size="1.2rem"
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon> */}
              {cookies.userId === authorId && (
                <>
                  <ActionIcon>
                    <IconPencil
                      size="1.2rem"
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                      onClick={() => {
                        setOpened(true);
                        form.setValues({ title, desc });
                      }}
                    />
                  </ActionIcon>
                  <AppModal
                    opened={opened}
                    setOpened={setOpened}
                    title="Edit Blog"
                    form={form}
                    type="update"
                    submitFunction={updatePost}
                  />
                  <ActionIcon onClick={() => deletePost(id)}>
                    <IconTrash
                      size="1.2rem"
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </>
              )}
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </Grid.Col>
  );
};

export default BlogCard;
