import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { myUrl } from "../App";
import "../css/home.css";
import SingleRow from "./SingleRow";

export default function Home() {
  const selector = useSelector((store) => store);
  const [data, setData] = useState([]);
  const [render, setRender] = useState();
  const [search, setSearch] = useState("");
  const QueryData = () => {
    fetch(`${myUrl}/product/query/${search}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        token: selector.Token,
      },
    })
      .then((elm) => {
        return elm.json();
      })
      .then((elm) => {
        setData(elm.data);
        console.log(elm);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  const fetchData = () => {
    fetch(`${myUrl}/product/dashboard`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        token: selector.Token,
      },
    })
      .then((elm) => {
        return elm.json();
      })
      .then((elm) => {
        setData(elm.data);
        // console.log(elm);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    if (selector.Token) {
      if (search) {
        QueryData();
      } else {
        fetchData();
      }
    }
  }, [render, search]);
  return (
    <div>
      <ToastContainer />
      <h2>Product Management</h2>

      <input
        type="text"
        placeholder="Search the product.."
        title="Type the product name"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="tableItem">
        <table id="myTable">
          <tbody>
            <tr className="header">
              <th>Product Name</th>
              <th>Stock Availability</th>
              <th>Actions</th>
            </tr>
            {data.map((elm, idx) => {
              return (
                <SingleRow
                  elm={elm}
                  key={idx}
                  setRender={setRender}
                  toast={toast}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
