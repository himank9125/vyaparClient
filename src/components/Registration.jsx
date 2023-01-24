import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myUrl } from "../App";
import { saveName, saveToken } from "../reduxToolkit/slice";

export default function Registration({ setLogin }) {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const storeR = useRef();
  const nameR = useRef();
  const mobileR = useRef();
  const emailR = useRef();
  const passwordR = useRef();
  const confpasswordR = useRef();
  const addressR = useRef();

  const regHandler = (e) => {
    e.preventDefault();
    const storeName = storeR.current.value;
    const userName = nameR.current.value;
    const mobile = mobileR.current.value;
    const email = emailR.current.value;
    const password = passwordR.current.value;
    const confpassword = confpasswordR.current.value;
    const address = addressR.current.value;
    fetch(`${myUrl}/user/reg`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeName,
        userName,
        mobile,
        email,
        password,
        confpassword,
        address,
      }),
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
        console.log(elm);
      })
      .catch((err) => {
        toast.error(err);
        // console.log(err);
      });
  };
  return (
    <div className="regContainer">
      <ToastContainer />
      <div className="container">
        <h3>Registration Window</h3>
        <form>
          <label>
            Business Name
            <input
              type="text"
              name="storeName"
              placeholder="Your Business Name.."
              ref={storeR}
            />
          </label>
          <label>
            Your Name
            <input
              type="text"
              name="userName"
              placeholder="Your Name.."
              ref={nameR}
            />
          </label>

          <label>
            Mobile Number
            <input
              type="text"
              name="mobile"
              placeholder="Your Mobile Number.."
              ref={mobileR}
            />
          </label>

          <label>
            Email Id
            <input
              type="email"
              name="email"
              placeholder="Your Email Id.."
              ref={emailR}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password.."
              ref={passwordR}
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confpassword"
              placeholder="Confirm Password.."
              ref={confpasswordR}
            />
          </label>

          <label>
            Your Address
            <textarea
              name="address"
              placeholder="Your Address.."
              ref={addressR}
            ></textarea>
          </label>

          <input type="submit" value="Submit" onClick={regHandler} />
        </form>
        <p
          onClick={() => {
            setLogin(true);
          }}
        >
          Alreasy registered, click here to login
        </p>
      </div>
    </div>
  );
}
