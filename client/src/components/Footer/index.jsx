import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./footer.module.css";
import Contacts from "../Contacts/";
import { loadUsers } from "../../redux/features/admin";

const Footer = () => {
  const users = useSelector((state) => state.adminReducer.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className={styles.footer} >
      <div className={styles.container}>
        <Contacts />

        <div className={styles.users}>
            {users.map((item) => {
              return (
                <div className={styles.users__img} key={item._id}>
                  <img
                  className={styles.user}
                  src={`/${item.img}`}
                  alt="service"
                />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
