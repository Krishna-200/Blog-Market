import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { URL, IF } from "../url";
import axios from "axios";
import { UserContext } from "../context/userContext";
import Comment from "../components/Comment";
import css from "../styles/PostDetails.module.css";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comment, setCommnet] = useState("");
  const [commnets, setCommnets] = useState([]);
  const navigate = useNavigate();
  //   console.log(postId);
  const fetchPost = async () => {
    try {
      const res = await axios(URL + "/api/posts/" + postId);
      //   console.log(res.data);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      // console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setCommnets(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      // fetchPostComments()
      // setComment("")
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.image}>
        <img src={IF + post.photo} alt="image" />
      </div>
      <div className={css.text}>
        <div className={css.title}>
          <h1>{post.title}</h1>
          {user?._id === post?.userId && (
            <div className={css.editButton}>
              <div onClick={() => navigate("/edit/" + postId)}>
                <BiEdit />
                Edit
              </div>
              <div onClick={handleDeletePost}>
                <MdDelete /> Delete
              </div>
            </div>
          )}
          <div className={css.author}>
            Published by: @{post.username}
            <span> on {new Date(post.updatedAt).toString().slice(0, 15)}</span>
            <span>{new Date(post.updatedAt).toString().slice(16, 24)}</span>
          </div>
        </div>
        <div className={css.desc}>
          <p>{post.desc}</p>
          <div>
            <spap>categories: </spap>
            {post.categories?.map((c, i) => (
              <span className={css.categories} key={i}>
                {c}
              </span>
            ))}
          </div>
        </div>
        {commnets?.map((c) => (
          <Comment key={c._id} c={c} post={post} />
        ))}
        <div className={css.cWrite}>
          <input
            onChange={(e) => setCommnet(e.target.value)}
            type="text"
            placeholder="enter your comment"
          />
          <button onClick={postComment}> add comment</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
