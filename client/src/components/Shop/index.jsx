import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../redux/features/cart";
import { loadProducts } from "../../redux/features/shop";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import styles from "./shop.module.css";
import logo from "../../assets/logo-white.png";

const Shop = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.productsReducer.products);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const loading = useSelector((state) => state.cartReducer.loading);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleBuyProduct = (product, price) => {
    dispatch(addCartItem(product, price, cartItems._id));
  };

  const filtered = products.filter((product) => {
    return product.name.toLowerCase().includes(value.toLowerCase());
  });

  const handleSearch = (text) => {
    setValue(text);
  };

  return (
    <div className={styles.shop}>
      <div className={styles.shop__container}>
        <div className={styles.shop__header}>
          <div>
            <NavLink to={"/"}>
              <img  className={styles.shop__header__logo} src={logo} alt="logo" />
            </NavLink>
          </div>

          <h1 className={styles.shop__header__title}>Магазин</h1>
          <Cart />
        </div>

        <div className={styles.shop___search__form}>
          <div className={styles.search}>
            <div>
              <input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                placeholder=" "
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.shop__main}>
          {!loading
            ? filtered.map((product) => {
                const isCartItem = !token
                  ? null
                  : cartItems.productsCart.find(
                      (item) => item.product === product._id
                    );

                return (
                  <div className={styles.product__cart} key={product._id}>
                    <div className={styles.product__cart__img}>
                      <img
                        src={`http://localhost:5000/${product.img}`}
                        alt="product"
                      />
                    </div>
                    <div className={styles.product__cart__text}>
                      <div className={styles.cart__text__top}>
                        <p>{product.price} ₽</p>
                        <p>{product.weight} гр</p>
                      </div>
                      <h5>{product.name}</h5>
                    

                    {!token ? (
                      <NavLink to={"/signin"}>
                        <button>Купить</button>
                      </NavLink>
                    ) : (
                      <button
                        disabled={isCartItem}
                        onClick={() => handleBuyProduct(product._id, product.price)}
                      >
                        {isCartItem ? "В корзине" : "добавить в корзину"}
                      </button>
                    )}
                    </div>
                  </div>
                );
              })
            : "идет загрузка"}
        </div>
      </div>
    </div>
  );
};

export default Shop;
