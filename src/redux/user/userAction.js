const loginSuccess = (payload) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: payload,
  }
}

const logoutSuccess = (payload) => {
  return {
    type: "LOGOUT_SUCCESS",
    payload: payload,
  }
}


export const login = ( user ) => {
  return async (dispatch) => {
    dispatch(
      loginSuccess({
        user,
      })
    );
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutSuccess());
  }
}