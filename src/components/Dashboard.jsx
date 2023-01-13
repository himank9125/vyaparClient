import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header/Header";

export default function Dashboard() {
  const selector = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selector.Token) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
