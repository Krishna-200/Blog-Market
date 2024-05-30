import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import css from "../styles/LandingPage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { URL } from "../url";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  async function getPosts() {
    const res = await axios.get(URL + "/api/posts" + search);
    setPosts(res.data);
  }

  useEffect(() => {
    getPosts();
  }, [search]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderItems = [
    {
      id: 1,
      title: "Bird",
      desc: "Beautiful view of a forest in the morning mist.",
      photo: "../public/tawny-owl-7777285_1280.jpg",
    },
    {
      id: 2,
      title: "City Life",
      desc: "The vibrant nightlife of a bustling city.",
      photo: "../public/pexels-iriser-1122639.jpg",
    },
    {
      id: 3,
      title: "Mountains",
      desc: "Snow-capped mountains under a clear blue sky.",
      photo: "../public/touann-gatouillat-vergos-dSBJv66Yjlk-unsplash.jpg",
    },
    {
      id: 4,
      title: "Mountains",
      desc: "Snow-capped mountains under a clear blue sky.",
      photo: "../sky-8763986_1280.jpg",
    },
    {
      id: 4,
      title: "Mountains",
      desc: "Snow-capped mountains under a clear blue sky.",
      photo: "../public/hero-book-cover.jpg",
    },
  ];
  const cardItemsTop = [
    {
      id: 1,
      title: "Nature",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "../public/pexels-photo-3178786.webp",
      link: "/posts/1",
    },
    {
      id: 2,
      title: "Traditional",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "../public/pexels-fotios-photos-16572560.jpg",
      link: "/posts/2",
    },
    {
      id: 3,
      title: "Animal",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "../public/pexels-sh95-3578264.jpg",
      link: "/posts/3",
    },
  ];

  return (
    <div className={css.container}>
      <div className={css.navbar}>
        <h2>Daily Articles</h2>
        <div className={css.navbarLinks}>
          <Link style={{ textDecoration: "none" }} to="/allposts">
            <p>All Posts</p>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/about">
            <p>About us</p>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/register">
            <p>Login</p>
          </Link>
        </div>
      </div>
      <div className={css.posts}>
        <div className={css.leftPosts}>
          <h3>Most Popular</h3>
          {posts.map(
            (post, index) =>
              index < 3 && (
                <div key={post.id}>
                  <span className={css.leftPostsImg}>
                    <img src={`${URL}/images/${post.photo}`} alt={post.title} />
                  </span>
                  <h6>Published by: {post.username}</h6>
                  <h5>{post.title.slice(0, 30)}.....</h5>
                </div>
              )
          )}
        </div>
        <div className={css.middlePosts}>
          <Slider {...settings}>
            {sliderItems.map((item) => (
              <div key={item.id} className={css.sliderItem}>
                <img src={item.photo} alt={item.title} />
                <div className={css.sliderText}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link to={item.link}>Read More</Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className={css.rightPosts}>
          <h3>Latest Articles</h3>
          {posts.map(
            (post, index) =>
              index < 3 && (
                <div key={post.id}>
                  <span className={css.rightPostsImg}>
                    <img src={`${URL}/images/${post.photo}`} alt={post.title} />
                  </span>
                  <h6>Published by: {post.username}</h6>
                  <h5>{post.title.slice(0, 30)}.....</h5>
                </div>
              )
          )}
        </div>
      </div>
      <div className={css.topCards}>
        {cardItemsTop.map((item) => (
          <div key={item.id} className={css.card}>
            <img src={item.photo} alt={item.title} />
            <div className={css.topcardText}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={css.bottomCards}>
        <div className={css.bottomLeftCard}>
          <div className={css.card}>
            <img src="../public/pexels-brunogobofoto-3907022.jpg" alt="" />
            <p className={css.cardText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>
        </div>
        <div className={css.bottomRightCard}>
          <div className={css.bottomRightTopCard}>
            <div className={css.card}>
              <img src="../public/pexels-maumascaro-1154189.jpg" alt="" />
              <p className={css.cardText}>
                party culture in cities are getting way bigger then ever.
              </p>
            </div>
          </div>
          <div className={css.bottomRightBottomCard}>
            <div className={css.card}>
              <img src="../public/pexels-ryannielm-16763202.jpg" alt="" />
              <p className={css.cardText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
            <div className={css.card}>
              <img
                src="../public/pexels-lenin-estrada-117221-2103864.jpg"
                alt=""
              />
              <p className={css.cardText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
