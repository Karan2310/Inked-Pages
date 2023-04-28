import React from "react";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mantine/core";
const AllBlogs = ({ blogs, getBlogs }) => {
  return (
    <>
      {blogs.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "30%" }}>
          <h4
            style={{
              color: "#b5b5b5",
            }}
          >
            No blogs found
          </h4>
        </div>
      )}
      <Grid>
        {blogs.map((blog) => {
          const {
            _id,
            title,
            authorName,
            createdAt,
            desc,
            authorId,
            updatedAt,
          } = blog;
          const date = new Date(updatedAt).toLocaleString();

          return (
            <BlogCard
              key={_id}
              id={_id}
              title={title}
              desc={desc}
              authorName={authorName}
              createdAt={date}
              authorId={authorId}
              getBlogs={getBlogs}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default AllBlogs;
