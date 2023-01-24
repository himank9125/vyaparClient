import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myUrl } from "../App";
import { saveName, saveToken } from "../reduxToolkit/slice";

export default function Login({ setLogin }) {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const emailR = useRef();
  const passwordR = useRef();
  const handleSign = (e) => {
    e.preventDefault();
    const email = emailR.current.value;
    const password = passwordR.current.value;
    fetch(`${myUrl}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((elm) => {
        return elm.json();
      })
      .then((elm) => {
        if (elm.token) {
          dispatch(saveName(elm.data.storeName));
          dispatch(saveToken(elm.token));
          nevigate("dashboard");
        } else {
          toast.error(elm.error);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err);
      });
  };
  return (
    <div className="regContainer">
      <ToastContainer />
      <div className="container">
        <h3>Login Window</h3>
        <form>
          <label>
            Email Id
            <input
              type="email"
              name="email"
              ref={emailR}
              placeholder="Your Email Id.."
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              ref={passwordR}
              placeholder="Password.."
            />
          </label>

          <input type="submit" onClick={handleSign} value="Submit" />
        </form>

        <p
          onClick={() => {
            setLogin(false);
          }}
        >
          Not Registered, click here to Register
        </p>
      </div>
    </div>
  );
}
