import React, { useState } from "react";
import styles from "../css/addProduct.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { myUrl } from "../App";
import { useSelector } from "react-redux";

export default function SingleRow({ elm, setRender, toast }) {
  const [hidetable, setHidetable] = useState("hidden");
  const [hideform, setHideform] = useState("hidden");
  const [hideovl, setHideovl] = useState("hidden");
  const selector = useSelector((store) => store);
  const [name, setName] = useState(elm.name);
  const [hsn, setHsn] = useState(elm.hsn);
  const [stock, setStock] = useState(elm.stock);
  const [batch, setBatch] = useState(elm.batch);
  const [rate, setRate] = useState(elm.rate);

  const updateRow = (e, id) => {
    e.preventDefault();
    fetch(`${myUrl}/product/update/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        token: selector.Token,
      },
      body: JSON.stringify({ name, hsn, stock, batch, rate }),
    })
      .then((elm) => {
        return elm.json();
      })
      .then((elm) => {
        if (elm.data) {
          addhdd(setHideform);
          addhdd(setHideovl);
          setRender(new Date());
          toast.success(elm.message);
        } else {
          toast.error(elm.error);
        }
        // console.log(elm);
      })
      .catch((err) => {
        toast.error(err);
        // console.log(err);
      });
  };
  const DeleteRow = (id) => {
    fetch(`${myUrl}/product/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        token: selector.Token,
      },
    })
      .then((elm) => {
        return elm.json();
      })
      .then((elm) => {
        // console.log(elm);
        if (elm.data) {
          toast.success(elm.message);
          setRender(new Date());
        } else {
          toast.error(elm.error);
        }
      })
      .catch((err) => {
        toast.error(err);
        // console.log(err);
      });
  };
  // ---------------------------------className "hidden" Management---------------------------
  const removehdd = (setter) => {
    setter("");
  };
  const addhdd = (setter) => {
    setter("hidden");
  };
  // ---------------------------------className "hidden" Management---------------------------
  return (
    <>
      {/* ------------------Rendering Table Rows-------------------------------- */}
      <tr>
        <td>{elm.name}</td>
        <td>{elm.stock}</td>
        <td>
          <span
            className="icon"
            onClick={() => {
              removehdd(setHidetable);
              removehdd(setHideovl);
            }}
          >
            <VisibilityIcon />
          </span>
          <span
            className="icon"
            onClick={() => {
              removehdd(setHideform);
              removehdd(setHideovl);
            }}
          >
            <ModeEditIcon />
          </span>
          <span
            className="icon"
            onClick={() => {
              DeleteRow(elm._id);
            }}
          >
            <DeleteForeverIcon />
          </span>
        </td>
      </tr>
      {/* ------------------Rendering Table Rows-------------------------------- */}
      {/* -----------------------overlay---------------------- */}
      <div className={`overlay ${hideovl}`}></div>
      {/* -----------------------overlay---------------------- */}
      {/* ----------------------Single Item on View-------------------------- */}
      <div className={`tableItem tblmodal ${hidetable}`}>
        <button
          className="close-tblmodal"
          onClick={() => {
            addhdd(setHideovl);
            addhdd(setHidetable);
          }}
        >
          &times;
        </button>
        <table id="myTable">
          <tbody>
            <tr>
              <td>Product Name</td>
              <td>{elm.name}</td>
            </tr>
            <tr>
              <td>Product HSN</td>
              <td>{elm.hsn}</td>
            </tr>
            <tr>
              <td>Product Rate</td>
              <td>{elm.rate}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{elm.stock}</td>
            </tr>
            <tr>
              <td>Batch Number</td>
              <td>{elm.batch}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* ----------------------Single Item on View-------------------------- */}
      {/* ------------------------Edit/Update Form---------------------------- */}
      <div className={`formItem ${hideform}`}>
        <button
          className="close-tblmodal"
          onClick={() => {
            addhdd(setHideovl);
            addhdd(setHideform);
          }}
        >
          &times;
        </button>
        <div className={styles.productContainer}>
          <form>
            <fieldset>
              <legend>Product Updation</legend>
              <div className={styles.colums}>
                <div className={styles.item}>
                  <label>
                    Product Name
                    <input
                      type="text"
                      name="fname"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className={styles.item}>
                  <label>
                    Product HSN Number
                    <input
                      type="text"
                      name="fname"
                      value={hsn}
                      onChange={(e) => {
                        setHsn(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className={styles.item}>
                  <label>
                    Product Stock
                    <input
                      type="text"
                      name="fname"
                      value={stock}
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className={styles.item}>
                  <label>
                    Product batch Number
                    <input
                      type="text"
                      name="fname"
                      value={batch}
                      onChange={(e) => {
                        setBatch(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className={styles.item}>
                  <label>
                    Product Rate
                    <input
                      type="text"
                      name="fname"
                      value={rate}
                      onChange={(e) => {
                        setRate(e.target.value);
                      }}
                    />
                  </label>
                </div>
              </div>
            </fieldset>

            <button
              className={styles.btn}
              onClick={(e) => {
                updateRow(e, elm._id);
              }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
      {/* ------------------------Edit/Update Form---------------------------- */}
    </>
  );
}
