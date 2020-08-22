import React, { useState } from "react";

import { database } from "../../firebase/firebase.utils";
import "./entry-point.styles.scss";
import { useAlert } from "react-alert";

const EntryPoint = ({ currentCustomer, identifier }) => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const alert = useAlert();

  const handleSubmit = (event) => {
    event.preventDefault();
    database
      .ref(`bodega/${identifier[currentCustomer]}/list`)
      .push({
        description,
        price,
      })
      .then(() => {
        setDescription("");
        setPrice("");
        alert.show("Item Added");
      });

    setDescription("");
    setPrice("");
  };
  return (
    <form className="entry-point" onSubmit={handleSubmit}>
      <h2>Add Item</h2>
      <label>Details</label>
      <input
        type="text"
        placeholder="Details"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <label>Price</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />
      <input type="Submit" value="ADD" readOnly />
    </form>
  );
};

export default EntryPoint;
