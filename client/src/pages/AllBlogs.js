import React from "react";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mantine/core";
const AllBlogs = ({ blogs, getBlogs, loading }) => {
  const blogArray = Array.isArray(blogs) ? blogs : [];
  return (
    <>
      {!loading && blogs && blogs.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <h4
            style={{
              color: "#b5b5b5",
            }}
          >
            No blogs found
          </h4>
        </div>
      )}
      {!loading && (
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

            const isEdited = createdAt !== updatedAt;

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
                isEdited={isEdited}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default AllBlogs;
