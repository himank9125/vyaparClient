import React, { useState } from "react";
import Login from "./Login";
import "../css/reg.css";
import Registration from "./Registration";
import { myUrl } from "../App";

export default function LandingPage() {
  const [login, setLogin] = useState(true);
  useState(() => {
    fetch(myUrl);
  }, []);
  return (
    <div>
      {login ? (
        <Login setLogin={setLogin} />
      ) : (
        <Registration setLogin={setLogin} />
      )}
    </div>
  );
}
