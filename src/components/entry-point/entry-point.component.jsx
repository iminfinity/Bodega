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
      <input
        type="text"
        placeholder="Details"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <ion-button color="dark" type="submit">
        <ion-icon name="add-sharp" />
      </ion-button>
    </form>
  );
};

export default EntryPoint;
