import React, { useState } from "react";
import Login from "./Login";
import "../css/reg.css";
import Registration from "./Registration";

export default function LandingPage() {
  const [login, setLogin] = useState(true);
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
