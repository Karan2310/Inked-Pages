import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mantine/core";

const MyBlogs = ({ blogs, getBlogs, loading }) => {
  const [cookies] = useCookies(["userId"]);

  // Check if blogs is not an array or is null/undefined, then provide an empty array as a fallback value
  const myBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) => blog.authorId === cookies.userId)
    : [];

  return (
    <>
      {!loading && myBlogs.length === 0 && (
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
        {myBlogs.map((blog) => {
          // ... (rest of the code)
        })}
      </Grid>
    </>
  );
};

export default MyBlogs;
