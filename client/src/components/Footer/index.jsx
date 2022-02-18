import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./footer.module.css";
import { loadUsers } from "../../redux/features/admin";
import { Map, Placemark, YMaps } from "react-yandex-maps";

const Footer = () => {
  const users = useSelector((state) => state.adminReducer.users);

  const dispatch = useDispatch();

  const [getMap, setGetMap] = useState(false);

  const handleGetMap = () => {
    setGetMap(true);
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className={styles.footer} >
      <div className={styles.container}>
      <div className={styles.contacts} id="address">
      <div className={styles.contacts__map}>
        <div
          onClick={handleGetMap}
          className={!getMap ? styles.onMapDiv : styles.noneMapDiv}
        ></div>
        <YMaps>
          <Map
            width={"100%"}
            height={"400px"}
            defaultState={{ center: [43.322583, 45.68986], zoom: 15 }}
          >
            <Placemark geometry={[43.322583, 45.68986]} />
          </Map>
        </YMaps>
      </div>
    </div>

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
