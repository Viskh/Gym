import React, { useEffect } from "react";
import styles from "./profile.module.css";
import styless from "../Subscriptions/subscription.module.css";
import stylesss from "../Trainer/trainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsers,
  loadUserSubscription,
  loadUserTrainer,
  uploadAvatar,
} from "../../redux/features/profile";
import { NavLink, useParams } from "react-router-dom";
import { loadSubscriptions } from "../../redux/features/subscription";
import { loadTrainers } from "../../redux/features/trainer";
import Timer from "./Timer";
import { loadAllCarts } from "../../redux/features/cart";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUserSubscription(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUserTrainer(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadTrainers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllCarts());
  }, [dispatch]);

  const users = useSelector((state) => state.profileReducer.users);

  const { id } = useParams();

  const userProfile = users.find((user) => user._id === id);

  const subscriptions = useSelector(
    (state) => state.subscriptionsReducer.subscriptions
  );
  const subscription = useSelector(
    (state) => state.profileReducer.subscription
  );
  const subsId = subscriptions.find(
    (item) => item._id === subscription.subscription
  );

  const trainers = useSelector((state) => state.trainerReducer.trainers);

  const trainer = useSelector(
    (state) => state.profileReducer.subscription.trainer
  );

  const trainerId = trainers.find((item) => item._id === trainer);

  const handleChangeImg = (e) => {
    dispatch(uploadAvatar(e.target.files[0], id));
  };

  if (!users.length) {
    return "загрузка";
  }
  return (
    <div className={styles.profile__container}>
      <div className={styles.header}>
        <div className={styles.header__name}>Мой профиль</div>
        <hr />
        <button className={styles.button_79}><NavLink to={"/"}>На главную</NavLink></button>
      </div>

      <div className={styles.profile__info__row}>
        <div className={styles.profile__info__user}>
          {userProfile.img ? (
            <div className={styles.profile__image__div}>
              <img
                width={200}
                src={`http://localhost:5000/${userProfile.img}`}
                alt="avatar"
              />
            </div>
          ) : (
            <img
              src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"
              alt=""
            />
          )}

          <div className={styles.input__wrapper}>
            <input
              onChange={(e) => handleChangeImg(e)}
              name="file"
              type="file"
              id="input__file"
              className={`${styles.input} ${styles.input__file}`}
            />
            <label htmlFor="input__file" className={styles.input__file_button}>
              <span className={styles.input__file_icon_wrapper}>
                <img
                  className="input__file-icon"
                  src="https://cdn-icons.flaticon.com/png/512/3033/premium/3033215.png?token=exp=1643371491~hmac=1ce0292b8023e8c9662817602d91ed35 "
                  alt="Выбрать файл"
                  width="40"
                />
              </span>
            </label>
          </div>

          <div className={styles.profile__userInfo__div}>
            <div className={styles.profile__userData}>
              Имя: {userProfile.name}
            </div>
            <div className={styles.profile__userData}>
              Возраст: {userProfile.age}
            </div>
            <div className={styles.profile__userData}>
              Вес: {userProfile.weight}
            </div>
            <div className={styles.profile__userData}>
              Почта: {userProfile.email}
            </div>
            <div className={styles.profile__userData}>
              Телефон: {userProfile.phone}
            </div>
          </div>
        </div>

        <div className={styles.main__info_purpose}>
          <div>
            <h2>Цель тренировок:</h2>
            <p className={styles.profile__userData}>

              {userProfile.purposeTrain}
            </p>
          </div>
        </div>
      </div>
      {trainerId || subsId ? (
        <div className={styles.footer}>
          {subsId ? (
            <figure className={styless.cart} key={subsId._id}>
              <h2 className={styless.cart__img__title}>{subsId.name}</h2>
              <img src={`http://localhost:5000/${subsId.img}`} alt="" />
              <figcaption>
                <h3 className={styless.cart__price}>{subsId.price} ₽</h3>
                <p>Абонемент на: {subsId.time / 3600 / 24} дней</p>
                <p>{subsId.text}</p>
                <div className={styles.timer}>
                  <Timer timestampMs={subscription.subscriptionDeadTime} />
                </div>
              </figcaption>
            </figure>
          ) : null}
          {trainerId ? (
            <div className={stylesss.cart}>
              <div className={stylesss.block_cart}>
                <div className={stylesss.image}>
                  <img src={`http://localhost:5000/${trainerId.img}`} alt="" />
                </div>
                <div className={stylesss.info}>
                  <h3>Имя: {trainerId.name}</h3>
                  <p>{trainerId.description}</p>
                  <p className={stylesss.star}>★ {trainerId.rating}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
