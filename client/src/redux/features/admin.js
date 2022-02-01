const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'admin/load/pending':
      return {
        ...state,
        loading: true
      };
    case 'admin/load/fulfilled':
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case 'admin/load/rejected':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const loadUsers = () => {
  return async (dispatch) => {
    dispatch({ type: 'admin/load/pending' })
    try {

      const res = await fetch(`/users`)
      const data = await res.json()

      dispatch({ type: 'admin/load/fulfilled', payload: data })
    } catch (e) {
      dispatch({ type: 'admin/load/rejected', payload: e })
    }
  }
} 