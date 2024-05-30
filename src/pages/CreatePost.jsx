import { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import css from "../styles/CreatePost.module.css";
import Navbar from "../components/Navbar";

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
    updatedCats.splice(i, 1); // Fix to correctly remove the category
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat.trim()) {
      // Prevent adding empty categories
      setCats((prev) => [...prev, cat.trim()]);
      setCat("");
    }
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
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        await axios.post(URL + "/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={css.container}>
        <h2 className={css.heading}>Create a post</h2>
        <form onSubmit={handleCreate}>
          <label>Enter post Title:</label>
          <input
            className={css.title}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter the title"
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
              placeholder="Enter a category"
            />
            <span onClick={addCategory}>Add</span>
          </div>
          <div>
            {cats.map((c, i) => (
              <span key={i} className={css.categories}>
                {c}
                <span onClick={() => deleteCategory(i)}>
                  <ImCross />
                </span>
              </span>
            ))}
          </div>
          <label>Enter your description:</label>
          <textarea
            className={css.textarea}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Enter the description"
          ></textarea>
          <div className={css.createbutton}>
            <button type="submit">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
