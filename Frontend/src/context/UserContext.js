import React from "react";
import axios from 'axios';
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE": // Add this case to handle LOGIN_FAILURE
      return { ...state,err:true, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state,isAuthenticated: false };
    case "STORE_USER_PROFILE":
      return { ...state, userProfile: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut ,Profile};

// ###########################################################
function loginUser(dispatch, login, password, history, setIsLoading, setError,err) {
  setError(false); // Reset error state before making the request
  setIsLoading(true);
  console.log(err);
  if (!!login && !!password) {
    axios
      .post('http://127.0.0.1:8000/api/login', {
        email: login, // Update to match your form field names
        password: password, // Update to match your form field names
      })
      .then(response => {
        // Handle the successful response from the backend
        console.log(response);
       
        const { token, user_id } = response.data; // Assuming your response contains a 'token' field

        setError(false); // Reset error state on success
        setIsLoading(false);

        // Store the token in local storage
        localStorage.setItem("id_token", token);
        localStorage.setItem("user_id", user_id);

        dispatch({ type: 'LOGIN_SUCCESS' });
        history.push('/app/dashboard');
      })
      .catch(error => {
        // Handle authentication failure
        console.log(err);
        err = true;
        console.log(err);

        setIsLoading(false);
        dispatch({ type: 'LOGIN_FAILURE' });
      
      });
  } else {
    dispatch({ type: 'LOGIN_FAILURE' });
    setError(true); // Set error state to true when login and password are missing
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  const token = localStorage.getItem("id_token");

  if (token) {
    try {
      // Make a POST request to the logout endpoint on the backend
       axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`, // Use Bearer token format
        },
      });

      // Remove the token from localStorage
      localStorage.removeItem("id_token");

      // Dispatch a sign out success action if you're using Redux
      // This action should update your application state accordingly
      dispatch({ type: "SIGN_OUT_SUCCESS" });

      // Redirect the user to the login page using React Router
      history.push("/login");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}

function Profile(dispatch) {
  const token = localStorage.getItem("id_token");

  if (!token) {
    // Token is not available, handle the case accordingly (e.g., redirect to login page)
    return Promise.reject("Token not available");
  }

  return axios
    .get('http://127.0.0.1:8000/api/user', {
      headers: {
        Authorization: `Token ${token}`, // Include the token in the request headers
      },
    })
    .then(response => {
      // Handle the successful response from the backend
      console.log(response);
      const { username, role } = response.data; // Assuming your response contains a 'token' field
      
      // Dispatch an action to store the user profile data in your application state
      dispatch({ type: 'STORE_USER_PROFILE', payload: response.data });
      console.log(username, role);
      return { login: username, role };
    })
    .catch(error => {
      // Handle any errors (e.g., unauthorized access)
      console.error(error);
      return Promise.reject(error);
    });
}
