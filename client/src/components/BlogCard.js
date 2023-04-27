import React from "react";
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
  IconTrash,
} from "@tabler/icons-react";
import { Grid } from "@mantine/core";
import { useCookies } from "react-cookie";
import axios from "axios";

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
}) => {
  const [cookies] = useCookies(["userId"]);
  const { classes, theme } = useStyles();
  const deletePost = (postId) => {
    try {
      axios.delete(`/blogs/${postId}`);
      alert("Blog deleted successfully");
      // window.location.reload();
      getBlogs();
    } catch (error) {
      console.log(error);
      alert("Error deleting blog");
    }
  };
  return (
    <Grid.Col md={6} lg={4}>
      <Card withBorder padding="lg" radius="md" className={classes.card}>
        <Card.Section mb="sm">
          {/* <Image src={image} alt={title} height={180} /> */}
        </Card.Section>

        {/* <Badge>Hhh</Badge> */}

        <Text fw={700} className={classes.title} mt="xs">
          {title}
        </Text>

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
            <Group spacing={3}>
              {/* <ActionIcon>
                <IconBookmark
                  size="1.2rem"
                  color={theme.colors.yellow[6]}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon>
                <IconShare
                  size="1.2rem"
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </ActionIcon> */}
              {cookies.userId === authorId && (
                <ActionIcon onClick={() => deletePost(id)}>
                  <IconTrash
                    size="1.2rem"
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </Grid.Col>
  );
};

export default BlogCard;
