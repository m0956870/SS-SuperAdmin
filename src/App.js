import "./App.css";
import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Login from "./components/Auth/Login";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";

import Error from "./components/Error/Error";
import Home from "./components/Home/Home";

// reducer
import { reducer, initialState } from "./reducer/adminReducer";
export const AdminContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <AdminContext.Provider value={{ state, dispatch }}>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<ForgetPassword />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route> 
          <Route path="/error" element={<Error />}></Route>

          <Route path="/" element={<Home />}></Route>
          <Route path="/:route" element={<Home />}></Route>
          <Route path="/:route/:id" element={<Home />}></Route>
        </Routes>
      </AdminContext.Provider>
    </>
  )
}

export default App;