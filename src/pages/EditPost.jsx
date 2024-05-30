import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import css from "../styles/CreatePost.module.css";
import Navbar from "../components/Navbar";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        // console.log(imgUpload.data)
      } catch (err) {
        console.log(err);
      }
    }
    //post upload

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };
  return (
    <div>
      <Navbar />
      <div className={css.container}>
        <h2 className={css.heading}>Update a post </h2>
        <form action="">
          <label>Enter post Title:</label>
          <input
            className={css.title}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="title"
          />
          <div>
            <label>Upload Image:</label>
            <input
              className={css.imageUpload}
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
          </div>
          <div className={css.addCategories}>
            <label>Enter categories:</label>
            <input
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              type="text"
              placeholder="add your category"
            />
            <span onClick={addCategory}>Add</span>
          </div>
          <div>
            {cats?.map((c, i) => (
              <span key={i}>
                <span className={css.categories}>
                  {c}
                  <span onClick={() => deleteCategory(i)}>
                    <ImCross />
                  </span>
                </span>
              </span>
            ))}
          </div>
          <label> Enter your description:</label>
          <textarea
            className={css.textarea}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            cols="30"
            rows="10"
            placeholder="enter your description"
          ></textarea>
          <div className={css.createbutton}>
            <button onClick={handleEdit}>Update post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
