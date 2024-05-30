import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import { UserContext } from "../context/userContext";
import Comment from "../components/Comment";
import css from "../styles/PostDetails.module.css";
import Navbar from "../components/Navbar";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        URL + "/api/comments/create",
        {
          comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComment("");
      fetchPostComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={css.container}>
        <div className={css.image}>
          <img src={`${URL}/images/${post.photo}`} alt={post.title} />
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
          </div>
          <div className={css.author}>
            Published by: @{post.username}
            <span> on {new Date(post.updatedAt).toString().slice(0, 15)}</span>
            <span>{new Date(post.updatedAt).toString().slice(16, 24)}</span>
          </div>
          <div className={css.desc}>
            <p>{post.desc}</p>
            <div>
              <span>categories: </span>
              {post.categories?.map((c, i) => (
                <span className={css.categories} key={i}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          {comments.map((c) => (
            <Comment key={c._id} c={c} post={post} />
          ))}
          <div className={css.cWrite}>
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="enter your comment"
              value={comment}
            />
            <button onClick={postComment}>add comment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
