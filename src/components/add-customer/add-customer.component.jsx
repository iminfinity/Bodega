import React, { useState } from "react";
import { database, storage } from "../../firebase/firebase.utils";
import "./add-customer.styles.scss";

import { useAlert } from "react-alert";

const AddCustomer = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [source, setSource] = useState(null);

  const alert = useAlert();

  const createUser = (event) => {
    event.preventDefault();
    database
      .ref("bodega")
      .push({
        customerName,
        customerPhoneNumber,
        profile_picture: source ? source.name : "",
      })
      .then(() => {
        if (source) {
          storage
            .ref("bodega-images/" + source.name)
            .put(source)
            .then(() => {
              setSource(null);
            })
            .catch((error) => alert(error.message));
        }
        setCustomerName("");
        setCustomerPhoneNumber("");
        setSource(null);
        alert.show("Customer added");
      });
  };

  const fileUpload = (event) => {
    if (event.target.files[0]) {
      setSource(event.target.files[0]);
    }
  };

  return (
    <form className="add-customer" onSubmit={createUser}>
      <h2>Add New Customer</h2>
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          value={customerName}
          placeholder="Enter Customer Name"
          onChange={(event) => {
            setCustomerName(event.target.value);
          }}
          required
        />
      </div>
      <div className="input-group">
        <label>Phone</label>
        <input
          type="number"
          value={customerPhoneNumber}
          placeholder="Enter Customer Phone Number"
          onChange={(event) => {
            setCustomerPhoneNumber(event.target.value);
          }}
          required
        />
      </div>
      <div className="input-group">
        <label>Image</label>

        <input type="file" onChange={fileUpload} />
      </div>
      <input type="submit" value="Add Customer" readOnly />
    </form>
  );
};

export default AddCustomer;
