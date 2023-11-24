import { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import css from "../styles/CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    if (file) {
      console.log(file.name);
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      console.log(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.heading}>Create a post: </h2>
      <form action="">
        <label>Enter post Title:</label>
        <input
          className={css.title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder=""
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
        <p> Enter your description:</p>
        <textarea
          className={css.textarea}
          onChange={(e) => setDesc(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
        <div className={css.createbutton}>
          <button onClick={handleCreate}>create post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
