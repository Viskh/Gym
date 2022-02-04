import React, { useEffect } from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import logo1 from "../../assets/logo-white.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/auth";
import { loadUsers } from "../../redux/features/profile";

import Carousel from "react-elastic-carousel";
import bg1 from "../../assets/bg9.jpg";
import bg2 from "../../assets/bg10.jpg";
import bg3 from "../../assets/bg11.jpg";
import bg4 from "../../assets/bg12.jpg";
import bg5 from "../../assets/bg13.jpg";
import bg6 from "../../assets/bg15.jpg";
import bg7 from "../../assets/bg17.jpg";
import bg8 from "../../assets/bg19.jpeg";

const Header = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const users = useSelector((state) => state.profileReducer.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const admin = users.find((item) => (item ? item.role === "admin" : null));

  const handleClickLogut = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__navbar}>
          <div>
            <img
              className={styles.header__logo}
              src={logo1}
              alt=""
              width={50}
            />
          </div>
          <div className={styles.header__navbar__text}>
            {admin ? (
              !token ? null : id !== admin._id ? (
                <NavLink className={styles.header__links} to={`user/${id}`}>
                  Мой профиль
                </NavLink>
              ) : (
                <NavLink className={styles.header__links} to={`admin/${id}`}>
                  Админ
                </NavLink>
              )
            ) : null}
            <NavLink className={styles.header__links} to={"/shop"}>
              Магазин
            </NavLink>
            <NavLink className={styles.header__links} to={"/trainers"}>
              Тренеры
            </NavLink>
            <Link
              className={styles.header__links}
              to="subscription"
              smooth={true}
              duration={1000}
            >
              Абонeменты
            </Link>
            {!token ? (
              <NavLink className={styles.header__links} to={"/signin"}>
                Вход
              </NavLink>
            ) : (
              <NavLink
                className={styles.header__links}
                to={"/"}
                style={{ color: "red" }}
                onClick={handleClickLogut}
              >
                Выход
              </NavLink>
            )}
          </div>
        </div>

        <hr />

        <div className={styles.header__main}>
          <div className={styles.header__info}>
            <div className={styles.header__h1Div}>
              <h1 className={styles.header__h1}>Лучший фитнес зал в городе</h1>
            </div>

            <div className={styles.header__contacts}>
              <div className={styles.contacts__left__block}>
                <div className={styles.left__block__item}>
                  <h6>Адрес</h6>
                  <p>г. Грозный, ул. Лорсанова 9</p>
                </div>
                <div className={styles.left__block__item}>
                  <h6>Номер</h6>
                  <p>8 989 676 65 35</p>
                </div>
                <div className={styles.left__block__item}>
                  <h6>Наши страницы</h6>
                  <div>
                    <a href="https://www.youtube.com/">YouTube</a>
                    <a href="https://www.instagram.com/">Instagram</a>
                    <a href="https://www.vk.com/">VK</a>
                  </div>
                </div>
              </div>
              <div className={styles.contacts__right__block}>
                <a href="https://www.youtube.com/">
                  {" "}
                  <img
                    src="https://img.icons8.com/small/344/youtube-play.png"
                    alt=""
                  />
                </a>
                <a href="https://www.instagram.com/">
                  <img
                    src="https://img.icons8.com/small/344/instagram-new.png"
                    alt=""
                  />
                </a>

                <a href="https://www.vk.com/">
                  <img
                    src="https://img.icons8.com/small/344/vk-com.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.header__gallery}>
            <Carousel
              itemsToShow={1}
              autoPlaySpeed={3000}
              enableAutoPlay={true}
              tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
              transitionMs={700}
              showArrows={false}
              enableSwipe={true}
              pagination={true}
            >
              <img src={bg1} alt="" />
              <img src={bg2} alt="" />
              <img src={bg3} alt="" />
              <img src={bg4} alt="" />
              <img src={bg5} alt="" />
              <img src={bg6} alt="" />
              <img src={bg7} alt="" />
              <img src={bg8} alt="" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
