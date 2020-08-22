import React, { useEffect, useState } from "react";
import { storage, database } from "../../firebase/firebase.utils";
import "./customer-card.styles.scss";

import { useAlert } from "react-alert";

const CustomerCard = ({
  customerDetails,
  currentCustomer,
  identifier,
  currentCustomerTotal,
}) => {
  const current = customerDetails[currentCustomer];
  const [imageSource, setImageSource] = useState("");

  const alert = useAlert();

  useEffect(() => {
    if (current && current.profile_picture.length > 1) {
      storage
        .ref("bodega-images/" + current.profile_picture)
        .getDownloadURL()
        .then((url) => {
          setImageSource(url);
        })
        .catch((error) => {
          alert.show(error.message);
        });
    }

    return () => {
      console.log("Unmounted");
    };
  }, [alert, current]);

  const deleteCustomer = () => {
    database
      .ref("bodega/" + identifier[currentCustomer])
      .remove()
      .then(() => alert.show("Customer Deleted"));
  };
  return (
    <div className="customer-card">
      <img alt="user-pic" src={imageSource} className="customer-pic" />
      <div className="customer-details">
        <h2>
          {current ? current.customerName : null}
          <button
            className="delete-customer"
            onClick={() => deleteCustomer()}
            title="Delete Customer"
          >
            &#10006;
          </button>
        </h2>
        <h3>{current ? current.customerPhoneNumber : null}</h3>
        <p>Total: Rs {currentCustomerTotal}</p>
      </div>
    </div>
  );
};

export default CustomerCard;
