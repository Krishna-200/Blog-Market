import React from "react";
import css from "../styles/HeroPosts.module.css";
import { URL } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className={css.container}>
      {/* console.log(post) */}
      <div className={css.image}>
        <img src={URL + /images/ + post.photo} alt="" />
      </div>
      <div className={css.text}>
        <span>{post.title.slice(0, 70)}.....</span>
        <span>
          @{post.username}
          <span className={css.date}>
            {new Date(post.updatedAt).toString().slice(0, 21)}
          </span>
        </span>
        <span>
          {post.desc.slice(0, 350)}
          ...Read More
        </span>
      </div>
    </div>
  );
};

export default HomePosts;
