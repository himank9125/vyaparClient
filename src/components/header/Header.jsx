import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import style from "../../css/header.module.css";
import { saveName, saveToken } from "../../reduxToolkit/slice";

export default function Header() {
  const dispatch = useDispatch();
  const selector = useSelector((store) => store);
  const navigate = useNavigate();
  const logout = () => {
    dispatch(saveName(null));
    dispatch(saveToken(null));
    navigate("/");
  };
  return (
    <>
      <div className={style.navbar}>
        <NavLink to="../dashboard">Home</NavLink>
        <NavLink to="add">Add Product</NavLink>
        <NavLink to="#">Billing</NavLink>
        <NavLink to="#">Customers</NavLink>
      </div>
      <div className={style.header}>
        <span>{selector.Name}</span>
        <span className={style.icon} onClick={logout}>
          <LogoutIcon />
        </span>
      </div>
    </>
  );
}
