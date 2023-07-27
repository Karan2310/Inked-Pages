import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconUsers,
  IconUser,
} from "@tabler/icons-react";
import AllBlogs from "../pages/AllBlogs";
import MyBlogs from "../pages/MyBlogs";
import axios from "axios";
import { Grid } from "@mantine/core";
import { useCookies } from "react-cookie";
import { Skeleton } from "@mantine/core";

const ScreenTabs = ({ getBlogs, blogs, fetch, loading }) => {
  useEffect(() => {
    getBlogs();
  }, [fetch]);

  const [cookies] = useCookies(["userId"]);
  return (
    <>
      <Tabs defaultValue="all">
        <Tabs.List
          grow
          position="apart"
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "#FFF",
            zIndex: "100",
          }}
        >
          <Tabs.Tab value="all" icon={<IconUsers size="0.8rem" />}>
            All Blogs {`(${blogs.length})`}
          </Tabs.Tab>
          <Tabs.Tab value="my" icon={<IconUser size="0.8rem" />}>
            My Blogs{" "}
            {`(${
              Array.isArray(blogs)
                ? blogs.filter((blog) => blog.authorId === cookies.userId)
                    .length
                : 0
            })`}
          </Tabs.Tab>
        </Tabs.List>

        {loading && (
          <>
            <Grid mt={30}>
              <Grid.Col md={6} lg={3}>
                <Skeleton height={8} radius="xl" width="30%" mb={30} />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <Skeleton height={8} radius="xl" width="30%" mb={30} />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <Skeleton height={8} radius="xl" width="30%" mb={30} />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                <Skeleton height={8} radius="xl" width="30%" mb={30} />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Grid.Col>
            </Grid>
          </>
        )}

        <Tabs.Panel value="all" pt="md">
          <AllBlogs blogs={blogs} getBlogs={getBlogs} loading={loading} />
        </Tabs.Panel>

        <Tabs.Panel value="my" pt="md">
          <MyBlogs blogs={blogs} getBlogs={getBlogs} loading={loading} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ScreenTabs;
