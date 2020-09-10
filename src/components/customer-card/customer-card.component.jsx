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
    <ion-card>
      <img src={imageSource} alt="profile-pic" />
      <ion-card-header>
        <ion-card-title>{current ? current.customerName : null}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        {current ? current.customerPhoneNumber : null}
        <br />
        Total: Rs <b>{currentCustomerTotal}</b>
      </ion-card-content>
      <div className="delete-customer">
        <ion-button
          onClick={() => deleteCustomer()}
          title="Delete Customer"
          color="dark"
          size="small"
        >
          <ion-icon icon="trash-outline" />
        </ion-button>
      </div>
    </ion-card>
  );
};

export default CustomerCard;
