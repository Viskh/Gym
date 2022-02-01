const initialState = {
  signingUp: false,
  signingIn: false,
  error: null,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "application/signup/pending":
      return {
        ...state,
        signingUp: true,
        error: null,
      };

    case "application/signup/fulfilled":
      return {
        ...state,
        signingUp: false,
        user: action.payload
      };

    case "application/signup/rejected":
      return {
        ...state,
        signingUp: false,
        error: action.error,
      };

    case "application/signin/pending":
      return {
        ...state,
        signingIn: true,
        error: null,
      };

    case "application/signin/fulfilled":
      return {
        ...state,
        signingIn: false,
        id: action.payload.json.id,
        token: action.payload.json.token,
      };

    case "application/signin/rejected":
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };
    case "application/logOut/fulfilled":
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}

export const createUser = (email, password, name, weight) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });

    const responseRegister = await fetch("/users/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name, weight }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const jsonRegister = await responseRegister.json();

    const responseCart = await fetch(`/carts`, {
      method: "POST",
      body: JSON.stringify({ user: jsonRegister._id }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const jsonCart = await responseCart.json()


    if (jsonRegister.error) {
      dispatch({ type: "application/signup/rejected", error: jsonRegister.error });
    } else {
      dispatch({ type: "application/signup/fulfilled", payload: jsonRegister });
      dispatch({ type: "cart/create/fulfilled", payload: jsonCart });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signin/pending" });

    const response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await response.json();

    if (json.error) {
      dispatch({ type: "application/signin/rejected", error: json.error });
    } else {
      dispatch({ type: "application/signin/fulfilled", payload: { json } });
      localStorage.setItem("token", json.token);
      localStorage.setItem("id", json.id);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: "application/logOut/fulfilled" });
    localStorage.clear();
  };
};
