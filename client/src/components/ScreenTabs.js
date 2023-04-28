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

const ScreenTabs = ({ getBlogs, blogs, fetch }) => {
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
              blogs.filter((blog) => {
                return blog.authorId === cookies.userId;
              }).length
            })`}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all" pt="md">
          <AllBlogs blogs={blogs} getBlogs={getBlogs} />
        </Tabs.Panel>

        <Tabs.Panel value="my" pt="md">
          <MyBlogs blogs={blogs} getBlogs={getBlogs} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ScreenTabs;
