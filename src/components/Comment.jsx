import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import css from "../styles/PostDetails.module.css";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div className={css.comment}>
      <span>
        <span className={css.cHeader}>
          <span className={css.cAuthor}>@{c.author} </span>
          <span>
            {new Date(c.updatedAt).toString().slice(0, 15)}
            {new Date(c.updatedAt).toString().slice(16, 24)}
          </span>
          <span>
            {user?._id === c?.userId ? (
              <span className={css.cDelete}>
                <p onClick={() => deleteComment(c._id)}>
                  <MdDelete />
                  Delete
                </p>
              </span>
            ) : (
              ""
            )}
          </span>
        </span>
      </span>
      <span className={css.cText}>{c.comment}</span>
    </div>
  );
};

export default Comment;
