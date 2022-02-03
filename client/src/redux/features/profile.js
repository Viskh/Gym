const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "profile/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "profile/load/fulfilled":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "profile/load/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "profile/update/pending":
      return {
        ...state,
        loading: true,
      };
    case "profile/update/fulfilled":
      return {
        ...state,
        users: state.users.map((item) => {
          if (item._id === action.payload) {
            return item;
          }
          return item;
        }),
      };
    case "profile/update/image/pending":
      return {
        ...state,
        loading: true,
      };
    case "profile/update/image/fulfilled":
      return {
        ...state,
        users: state.users.map((item) => {
          if (item._id === action.payload._id) {
            item.img = action.payload.img;
            return item;
          }
          return state.users;
        }),
      };
    case "profile/update/image/rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "profile/update/info/fulfilled":
      return {
        ...state,
        users: state.users.map((item) => {
          if (item._id === action.payload._id) {
            item.name = action.payload.name;
            item.aboutMe = action.payload.aboutMe;
            item.age = action.payload.age;
            item.purposeTrain = action.payload.purposeTrain;
            item.favoriteQuote = action.payload.favoriteQuote;
            return item;
          }
          return state.users;
        }),
      };
    case "profile/loadSubscription/fulfilled":
      return {
        ...state,
        subscription: action.payload,
      };

    default:
      return state;
  }
};

export const loadUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "profile/load/pending" });

      const res = await fetch(`/users`);
      const users = await res.json();
      dispatch({ type: "profile/load/fulfilled", payload: users });
    } catch (e) {
      dispatch({ type: "profile/load/rejected", payload: e });
    }
  };
};

export const uploadAvatar = (file, id) => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch({ type: "profile/update/image/pending" });
    try {
      const formData = new FormData();
      formData.append("img", file);
      const res = await fetch(`/users/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      const data = await res.json();

      dispatch({ type: "profile/update/image/fulfilled", payload: data });
    } catch (error) {
      dispatch({ type: "profile/update/image/rejected", payload: error });
    }
  };
};

export const updateUserProfile = (
  id,
  name,
  age,
  aboutMe,
  purposeTrain,
  favoriteQuote
) => {
  const userInfo = {
    name,
    age,
    aboutMe,
    purposeTrain,
    favoriteQuote,
  };
  return (dispatch) => {
    fetch(`/profile/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then.data((data) => {
        dispatch({ type: "profile/update/info/fulfilled", payload: data });
      });
  };
};
