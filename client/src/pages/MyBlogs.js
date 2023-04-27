import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mantine/core";

const MyBlogs = ({ blogs }) => {
  const [cookies] = useCookies(["userId"]);

  const myBlogs = blogs.filter((blog) => {
    return blog.authorId === cookies.userId;
  });
  return (
    <>
      <Grid>
        {myBlogs &&
          myBlogs.map((blog) => {
            const { _id, title, authorName, createdAt, desc, authorId } = blog;
            const date = new Date(createdAt).toLocaleString();
            return (
              <BlogCard
                key={_id}
                id={_id}
                title={title}
                desc={desc}
                authorName={authorName}
                createdAt={date}
                authorId={authorId}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default MyBlogs;
