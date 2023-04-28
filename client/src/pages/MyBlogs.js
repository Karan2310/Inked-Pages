import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mantine/core";

const MyBlogs = ({ blogs, getBlogs, loading }) => {
  const [cookies] = useCookies(["userId"]);

  const myBlogs = blogs.filter((blog) => {
    return blog.authorId === cookies.userId;
  });
  return (
    <>
      {!loading && myBlogs && myBlogs.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <h4
            style={{
              color: "#b5b5b5",
            }}
          >
            No blogs posted
          </h4>
        </div>
      )}
      <Grid>
        {myBlogs &&
          myBlogs.map((blog) => {
            const {
              _id,
              title,
              authorName,
              createdAt,
              updatedAt,
              desc,
              authorId,
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
    </>
  );
};

export default MyBlogs;
