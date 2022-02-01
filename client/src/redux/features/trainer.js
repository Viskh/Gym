const initialState = {
  trainers: [],
  loading: false,
  error: null,
}

export const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'trainers/load/pending':
      return {
        ...state,
        loading: true,
      };

    case 'trainers/load/fullfilled':
      return {
        ...state,
        trainers: action.payload,
        loading: false,
      };

    case 'trainers/load/rejected':
      return {
        ...state,
        error: action.payload
      }

    case 'trainers/delete/pending':
      return {
        ...state,
        loading: true
      }
      
    case 'trainers/delete/fullfilled':
      return {
        ...state,
        trainers: state.trainers.filter((item) => item._id !== action.payload),
      }

    case 'trainers/delete/rejected':
      return {
        ...state,
        error: action.payload
      }

    case 'trainers/post/pending':
      return {
        ...state,
        loading: true
      }

    case 'trainers/post/rejected':
      return {
        ...state,
        error: action.payload
      }

    case "imageTrainer/post/fulfilled": 
    return {
      ...state,
      trainers: [...state.trainers, action.payload],
    }

    default:
      return state
  }
}

export const loadTrainers = () => {
  return async (dispatch) => {
    dispatch({ type: 'trainers/load/pending' });

    try {
      const res = await fetch('/users/trainers')
      const json = await res.json()


      dispatch({ type: 'trainers/load/fullfilled', payload: json })
    } catch (error) {
      dispatch({ type: 'trainers/load/rejected', payload: error })
    }
  }
}

export const deleteTrainer = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'trainers/delete/pending' })

    try {
      await fetch(`/admin/trainers/${id}`, {
        method: "DELETE"
      })

      dispatch({ type: 'trainers/delete/fullfilled', payload: id })
    }
    catch (error) {
      dispatch({ type: 'trainers/delete/rejected', payload: error })
    }
  }
}

export const addTrainer = (name, raiting, photo, info) => {

  return async (dispatch) => {
    dispatch({ type: "trainers/post/pending" })
    try {
      let options = {
        method: "POST",
        body: JSON.stringify({
          name: name,
          rating: raiting,
          description: info
        }),
        headers: { "Content-type": "application/json" },
      };

      const resTrainer = await fetch("/admin/trainers", options)
      const trainer = await resTrainer.json()

      
      const formData = new FormData();
      formData.append("img", photo);
      const resImage = await fetch(`/admin/trainers/image/${trainer._id}`, {
        method: "PATCH",
        body: formData,
      });
      const data = await resImage.json();


      dispatch({ type: "trainers/post/fulfilled", payload: trainer })
      dispatch({ type: "imageTrainer/post/fulfilled", payload: data })
    } catch (error) {
      dispatch({ type: "trainers/post/rejected", payload: error })
    }
  }
}