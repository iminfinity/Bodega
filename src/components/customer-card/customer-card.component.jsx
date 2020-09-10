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
    // <div className="customer-card">
    //   <img alt="user-pic" src={imageSource} className="customer-pic" />
    //   <div className="customer-details">
    //     <h2>
    //       {current ? current.customerName : null}
    //       <ion-button
    //         className="delete-customer"
    //         onClick={() => deleteCustomer()}
    //         title="Delete Customer"
    //         color="dark"
    //       >
    //         <ion-icon icon="trash-outline" />
    //       </ion-button>
    //     </h2>
    //     <h3>{current ? current.customerPhoneNumber : null}</h3>
    //     <p>Total: Rs {currentCustomerTotal}</p>
    //   </div>
    // </div>
    <>
      <ion-card>
        <img src={imageSource} alt="profile-pic" />
        <ion-card-header>
          <ion-card-subtitle></ion-card-subtitle>
          <ion-card-title>
            {current ? current.customerName : null}
          </ion-card-title>
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
    </>
  );
};

export default CustomerCard;
