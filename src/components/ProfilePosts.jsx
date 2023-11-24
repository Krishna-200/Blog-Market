import React from "react";
import css from "../styles/HeroPosts.module.css";
import { IF } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div>
      <div className={css.container}>
        <div className={css.image}>
          <img src={IF + p.photo} />
        </div>
        <div className={css.text}>
          <span>{p.title}</span>
          <span>
            {p.username}
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </span>
          <span>{p.desc.slice(0, 200)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
