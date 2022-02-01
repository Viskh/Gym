import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartIcon from "../../../assets/shopping-cart.svg";
import styles from "./cart.module.css";
import CartItem from "../CartItem";
import { useEffect } from "react";
import { deleteCart, loadCartItems } from "../../../redux/features/cart";

const Cart = () => {
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const loading = useSelector((state) => state.cartReducer.loading);

  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const handleClose = () => {
    setOpened(false);
  };

  const handleDeleteCart = () => {
    dispatch(deleteCart(cartItems._id));
  };

  useEffect(() => {
    dispatch(loadCartItems(userId));
  }, [dispatch, userId]);

  return (
    <>
      <div className={styles.cart__button} onClick={() => setOpened(true)}>
        <img src={cartIcon} alt="cart" />

        {token ? (
          !loading && cartItems.productsCart ? (
            cartItems.productsCart.length ? (
              <span>{cartItems.productsCart.length}</span>
            ) : null
          ) : null
        ) : null}
      </div>

      {!token ? null : !opened ? null : (
        <div className={styles.cart__window}>
          <button className={styles.cart__window__btn} onClick={handleClose}>
            Закрыть
          </button>
          {!cartItems.productsCart.length ? (
            "Корзина пуста"
          ) : (
            <table className={styles.cart__items}>
              <thead>
                <tr>
                  <th></th>
                  <th>Товар</th>
                  <th>Кол-во</th>
                  <th>Сумма</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.productsCart.map((productCart) => {
                  return (
                    <CartItem key={productCart._id} productCart={productCart} />
                  );
                })}
                <tr>
                  <td>
                    <button
                      className={styles.cart__delete__btn}
                      onClick={handleDeleteCart}
                    >
                      купить
                    </button>
                  </td>
                  <td></td>
                  <td>Итог:</td>
                  <td>
                    {cartItems.productsCart.length > 1
                      ? cartItems.productsCart.reduce((a, b) => {
                          return a.price * a.amount + b.price * b.amount;
                        })
                      : cartItems.productsCart[0].price}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
