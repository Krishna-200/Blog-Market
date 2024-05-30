import React from "react";
import css from "../styles/HeroPosts.module.css";
import { URL } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div className={css.container}>
      {/* console.log(post) */}
      <div className={css.image}>
        <img src={URL + /images/ + p.photo} alt="" />
      </div>
      <div className={css.text}>
        <span>{p.title.slice(0, 70)}.....</span>
        <span>
          @{p.username}
          <span className={css.date}>
            {new Date(p.updatedAt).toString().slice(0, 24)}
          </span>
        </span>
        <span>
          {p.desc.slice(0, 240)}
          ...Read More
        </span>
      </div>
    </div>
  );
};

export default ProfilePosts;
