import React, { useState, useEffect } from "react";
import styles from "./admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../redux/features/admin";
import { loadTrainers } from "../../redux/features/trainer";
import { loadSubscriptions } from "../../redux/features/subscription";
import { deleteTrainer } from "../../redux/features/trainer";
import { deleteSubscriptions } from "../../redux/features/subscription";
import Trainer from "./Trainer";
import Subscription from "./Subscription";
import { deleteProduct, loadProducts } from "../../redux/features/shop";
import Products from "./Products";
import { motion, AnimatePresence } from "framer-motion";
import { loadAllCarts } from "../../redux/features/cart";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadSubscriptions());
    dispatch(loadTrainers());
    dispatch(loadProducts());
    dispatch(loadAllCarts());
  }, [dispatch]);

  const users = useSelector((state) => state.adminReducer.users);
  const trainers = useSelector((state) => state.trainerReducer.trainers);
  const subscriptions = useSelector((state) => state.subscriptionsReducer.subscriptions);
  const products = useSelector((state) => state.productsReducer.products);
  const carts = useSelector((state) => state.cartReducer.carts);

  const filterCarts = carts ? carts.filter(cart => cart.subscription) : null

  const handleDeleteTrainer = (id) => {
    dispatch(deleteTrainer(id));
  };

  const handleDeleteSub = (id) => {
    dispatch(deleteSubscriptions(id));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };


  const [hide, setHide] = useState(false);
  const [hideSub, setHideSub] = useState(false);
  const [hideProduct, setHideProduct] = useState(false);
  const [hideUsers, setHideUsers] = useState(false);

  const handleSwitch = () => {
    setHide((prev) => {
      setHide(!prev);
    });
  };

  const handleSwitchSub = () => {
    setHideSub((prev) => {
      setHideSub(!prev);
    });
  };

  const handleSwitchProducts = () => {
    setHideProduct((prev) => {
      setHideProduct(!prev);
    });
  };

  const handleSwitchUsers = () => {
    setHideUsers((prev) => {
      setHideUsers(!prev);
    });
  };

  return (
    <div className={styles.admin__container}>
      <div className={styles.admin__block}>
        <div className={styles.admin__row}>
          <div>
            <h1>Админ</h1>
          </div>
        </div>

        {/* ================================================ */}

        <div className={styles.admin__row}>
          <div>
            <h1 className={styles.h1} onClick={handleSwitchSub}>
              Абонементы
            </h1>
          </div>
          <AnimatePresence>
            {hideSub && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{overflow: 'hidden'}}
              >
                <div className={styles.admin__postInputs}>
                  <Subscription />
                </div>
                <div className={styles.admin__abonements}>
                  {subscriptions.map((item) => {
                    return (
                      <div key={item._id}>
                        <p>имя: {item.name}</p>
                        <img
                          className={styles.admin__img}
                          src={`http://localhost:5000/${item.img}`}
                          alt=""
                        />
                        <p>цена: {item.price}</p>
                        <p>продолжительность: {item.time}</p>
                        <p>описание: {item.text}</p>
                        <button onClick={() => handleDeleteSub(item._id)}>
                          Удалить
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================ */}

        <div className={styles.admin__row}>
          <div>
            <h1 className={styles.h1} onClick={handleSwitch}>
              Тренеры
            </h1>
          </div>
          <AnimatePresence>
            {hide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{overflow: 'hidden'}}
              >
                <div className={styles.admin__postInputs}>
                  <Trainer />
                </div>
                <div className={styles.admin__trainers}>
                  {trainers.map((item) => {
                    return (
                      <div key={item._id}>
                        <p>название: {item.name}</p>
                        <p>рейтинг: {item.rating}</p>
                        <img
                          className={styles.admin__img}
                          src={`http://localhost:5000/${item.img}`}
                          alt=""
                        />
                        <p>описание: {item.description}</p>
                        <button onClick={() => handleDeleteTrainer(item._id)}>
                          Удалить
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================ */}

        <div className={styles.admin__row}>
          <div className={styles.h1} onClick={handleSwitchUsers}>
            <h1>Покупатели</h1>
          </div>
          <AnimatePresence>
            {hideUsers && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{overflow: 'hidden'}}
              >
                <div className={styles.admin__abonements}>
                  {users.map((user) => {
                    return filterCarts.map(cart => {
                      if(user._id === cart.user) {
                       return (
                        <div key={user._id}>
                        <p>имя: {user.name}</p>
                        <img
                          className={styles.admin__img}
                          src={`http://localhost:5000/${user.img}`}
                          alt=""
                        />
                        <p>Вес: {user.weight}</p>
                      </div>
                       )
                      }
                      return null
                    })
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.admin__row}>
          <div>
            <h1 className={styles.h1} onClick={handleSwitchProducts}>
              Спортивное питание
            </h1>
          </div>
          <AnimatePresence>
            {hideProduct && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{overflow: 'hidden'}}
              >
                <div className={styles.admin__postInputs}>
                  <Products />
                </div>
                <div className={styles.admin__abonements}>
                  {products.map((item) => {
                    return (
                      <div key={item._id}>
                        <p>имя: {item.name}</p>
                        <img
                          className={styles.admin__img}
                          src={`http://localhost:5000/${item.img}`}
                          alt=""
                        />
                        <p>Упаковка: {item.weight}</p>
                        <p>цена: {item.price}</p>
                        <p>описание: {item.description}</p>
                        <button onClick={() => handleDeleteProduct(item._id)}>
                          Удалить
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Admin;
