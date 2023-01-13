import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { myUrl } from "../App";
import styles from "../css/addProduct.module.css";

export default function AddProduct() {
  const selector = useSelector((store) => store);
  const nameR = useRef();
  const hsnR = useRef();
  const stockR = useRef();
  const batchR = useRef();
  const rateR = useRef();
  const productForm = useRef();

  const handleAdding = (e) => {
    e.preventDefault();
    const name = nameR.current.value;
    const hsn = hsnR.current.value;
    const stock = stockR.current.value;
    const batch = batchR.current.value;
    const rate = rateR.current.value;
    fetch(`${myUrl}/product/add`, {
      method: "post",
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
          toast.success(elm.message);
          productForm.current.reset();
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
  return (
    <div className={styles.productContainer}>
      <ToastContainer />
      <h1>Add Product Window</h1>
      <form ref={productForm}>
        <fieldset>
          <legend>Product Enlistment</legend>
          <div className={styles.colums}>
            <div className={styles.item}>
              <label>
                Product Name
                <input type="text" name="fname" ref={nameR} />
              </label>
            </div>
            <div className={styles.item}>
              <label>
                Product HSN Number
                <input type="text" name="fname" ref={hsnR} />
              </label>
            </div>
            <div className={styles.item}>
              <label>
                Product Stock
                <input type="text" name="fname" ref={stockR} />
              </label>
            </div>
            <div className={styles.item}>
              <label>
                Product batch Number
                <input type="text" name="fname" ref={batchR} />
              </label>
            </div>
            <div className={styles.item}>
              <label>
                Product Rate
                <input type="text" name="fname" ref={rateR} />
              </label>
            </div>
          </div>
        </fieldset>

        <button className={styles.btn} onClick={handleAdding}>
          Add
        </button>
      </form>
    </div>
  );
}
