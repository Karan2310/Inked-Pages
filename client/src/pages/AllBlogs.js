import React from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mantine/core";
const AllBlogs = ({ blogs }) => {
  return (
    <>
      <Grid>
        {blogs.map((blog) => {
          const { _id, title, authorName, createdAt, desc } = blog;
          return (
            <BlogCard
              key={_id}
              id={_id}
              title={title}
              desc={desc}
              authorName={authorName}
              createdAt={createdAt}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default AllBlogs;
