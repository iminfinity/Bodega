import React, { useState, useEffect } from "react";

import "./list.styles.scss";
import CustomerList from "../../components/customer-list/customer-list.component";
import EntryPoint from "../../components/entry-point/entry-point.component";
import Customer from "../../components/customer/customer.component";
import { database } from "../../firebase/firebase.utils";

import { useAlert } from "react-alert";

const List = () => {
  const [currentCustomer, setCurrentCustomer] = useState(0);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [identifier, setIdentifier] = useState([]);

  const alert = useAlert();

  const changeCurrentUser = (activeCustomer) => {
    setCurrentCustomer(activeCustomer);
  };

  useEffect(() => {
    try {
      database.ref("bodega").on("value", (snapshot) => {
        let data = [];
        let keys = [];
        snapshot.forEach((snap) => {
          keys.push(snap.key);
          data.push(snap.val());
        });
        setCustomerDetails(data);
        setIdentifier(keys);
      });
    } catch (error) {
      alert.show(error.message);
    }
  }, [alert]);

  return (
    <div className="list-page">
      <div className="user-details">
        <Customer
          currentCustomer={currentCustomer}
          customerDetails={customerDetails}
          identifier={identifier}
        />
        <EntryPoint currentCustomer={currentCustomer} identifier={identifier} />
      </div>
      <div className="users-list">
        <CustomerList
          currentCustomer={currentCustomer}
          changeCurrentUser={changeCurrentUser}
          customerDetails={customerDetails}
        />
      </div>
    </div>
  );
};

export default List;
