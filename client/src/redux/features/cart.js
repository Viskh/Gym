const initialState = {
  cartItems: {},
  loading: false,
  error: null,
  carts: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "cartItems/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "cartItems/load/fulfilled":
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case "carts/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "carts/load/fulfilled":
      return {
        ...state,
        loading: false,
        carts: action.payload,
      };

    case "carts/delete/pending":
      return {
        ...state,
        loading: true,
      };

    case "cart/delete/fulfilled":
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case "product/add/fulfilled":
      return {
        ...state,
        cartItems: action.payload,
      };

    case "product/delete/fulfilled":
      return {
        ...state,
        cartItems: action.payload,
      };

    case "product/increase/fulfilled":
      return {
        ...state,
        cartItems: action.payload,
      };

    case "product/decrease/fulfilled":
      return {
        ...state,
        cartItems: action.payload,
      };

      case 'subscription/addInCart/pending':
        return {
          ...state,
          loading: true
        }
      case 'subscription/addInCart/fulfilled':
        return {
          ...state,
          cartItems: action.payload,
          loading: false
        }
      case 'subscription/addInCart/rejected':
        return {
          ...state,
          error: action.payload
        }
        
    case 'trainer/addInCart/pending':
      return {
        ...state,
        loading: true
      }
    case 'trainer/addInCart/fulfilled':
      return {
        ...state,
        cartItems: action.payload,
        loading: false
      }
    case 'trainer/addInCart/rejected':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export const loadAllCarts = () => {
  return async (dispatch) => {
    dispatch({ type: "carts/load/pending" });
    try {
      const res = await fetch(`/carts`);

      const data = await res.json();

      dispatch({ type: "carts/load/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "carts/load/rejected", payload: error });
    }
  };
};

export const loadCartItems = (id) => {
  return async (dispatch) => {
    dispatch({ type: "cartItems/load/pending" });
    try {
      const res = await fetch(`/carts/${id}`);

      const data = await res.json();

      dispatch({ type: "cartItems/load/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "cartItems/load/rejected", payload: error });
    }
  };
};

export const subscriptionAddInCart = (subscription, id) => {
  return async (dispatch) => {
    dispatch({type: "subscription/addInCart/pending"})
    try {
      const res = await fetch(`/carts/add/subscription/in/${id}`,{
        method: "PATCH",
        body: JSON.stringify({subscription: subscription}),
        headers: {
          "Content-type": "application/json"
        }
      });
      const data = await res.json();
      dispatch({type: "subscription/addInCart/fulfilled", payload: data})
    }catch (e) {
      dispatch({type: "subscription/addInCart/rejected", payload: e})
    }
  }
}

export const trainerAddInCart = (trainer, id) => {
  return async (dispatch) => {
    dispatch({type: "trainer/addInCart/pending"})
    try {
      const res = await fetch(`/carts/add/trainer/${id}`,{
        method: "PATCH",
        body: JSON.stringify({trainer: trainer}),
        headers: {
          "Content-type": "application/json",
        }
      });
      const data = await res.json();
      dispatch({type: "trainer/addInCart/fulfilled", payload: data})

    }catch (e) {
      dispatch({type: "trainer/addInCart/rejected", payload: e})
    }
  }
}

export const removeCartItem = (product, id) => {
  return async (dispatch) => {
    dispatch({ type: "product/delete/pending" });
    try {
      const res = await fetch(`/carts/delete/item/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ product: product }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "product/delete/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "product/delete/rejected", payload: error });
    }
  };
};

export const addCartItem = (product, price, id) => {
  return async (dispatch) => {
    dispatch({ type: "product/add/pending" });
    try {
      const res = await fetch(`/carts/add/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ product: product, amount: 1, price: price }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();

      dispatch({ type: "product/add/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "product/add/rejected", payload: error });
    }
  };
};

export const increaseAmount = (productId, id) => {
  return async (dispatch) => {
    dispatch({ type: "product/increase/pending" });
    try {
      const res = await fetch(
        `/carts/product/increment/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ product: productId }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await res.json();

      dispatch({ type: "product/increase/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "product/increase/rejected", payload: error });
    }
  };
};

export const decreaseAmount = (productId, id) => {
  return async (dispatch) => {
    dispatch({ type: "product/decrease/pending" });
    try {
      const res = await fetch(
        `/carts/product/decrement/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ product: productId }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await res.json();

      dispatch({ type: "product/decrease/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "product/decrease/rejected", payload: error });
    }
  };
};

export const deleteCart = (id) => {
  return async (dispatch) => {
    dispatch({ type: "cart/delete/pending" });
    try {
      const res = await fetch(`/carts/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();


      dispatch({ type: "cart/delete/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "cart/delete/rejected", payload: error });
    }
  };
};
