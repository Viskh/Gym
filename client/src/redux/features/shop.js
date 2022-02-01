const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "products/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "products/load/fulfilled":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case "products/load/rejected":
      return {
        ...state,
        error: action.payload,
      };

    case "products/add/pending":
      return {
        ...state,
        loading: true,
      };

    case "products/add/fulfilled":
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };

    case "products/add/rejected":
      return {
        ...state,
        error: action.payload,
      };

    case "products/delete/pending":
      return {
        ...state,
        loading: true,
      };

    case "products/delete/fullfilled":
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };

    case "products/delete/rejected":
      return {
        ...state,
        error: action.payload,
      };

    

    default:
      return state;
  }
};

export const loadProducts = () => {
  return async (dispatch) => {
    dispatch({ type: "products/load/pending" });
    try {
      const res = await fetch(`http://localhost:5000/users/products`);
      const products = await res.json();

      dispatch({ type: "products/load/fulfilled", payload: products });
    } catch (error) {
      dispatch({ type: "products/load/rejected", payload: error });
    }
  };
};

export const addProduct = (name, img, price, weight, text) => {
  return async (dispatch) => {
    dispatch({ type: "products/add/pending" });
    try {
      const res = await fetch(`http://localhost:5000/admin/products`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          price: price,
          weight: weight,
          description: text,
        }),
        headers: { "Content-type": "application/json" },
      });
      const products = await res.json();

      const formData = new FormData();
      formData.append("img", img);
      const resImage = await fetch(
        `http://localhost:5000/admin/products/image/${products._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await resImage.json();

      dispatch({ type: "products/add/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "products/add/rejected", payload: error });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "products/delete/pending" });

    try {
      await fetch(`http://localhost:5000/admin/products/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "products/delete/fullfilled", payload: id });
    } catch (error) {
      dispatch({ type: "products/delete/rejected", payload: error });
    }
  };
};
