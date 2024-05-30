import axios from "axios";
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

  return (
    <div className={css.comment}>
      <div className={css.cHeader}>
        <span className={css.cAuthor}>@{c.author}</span>
        <span>
          {new Date(c.updatedAt).toString().slice(0, 15)}
          {new Date(c.updatedAt).toString().slice(16, 24)}
        </span>
        {user?._id === c?.userId && (
          <div className={css.cDelete} onClick={() => deleteComment(c._id)}>
            <p>
              <MdDelete />
              Delete
            </p>
          </div>
        )}
      </div>
      <div className={css.cText}>{c.comment}</div>
    </div>
  );
};

export default Comment;
