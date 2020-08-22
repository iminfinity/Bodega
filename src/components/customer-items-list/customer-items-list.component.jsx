import React, { useEffect, useState } from "react";

import { database } from "../../firebase/firebase.utils";
import "./customer-items-list.styles.scss";

import { useAlert } from "react-alert";

const CustomerItemsList = ({
  currentCustomer,
  identifier,
  customerDetails,
  findCurrentCustomerTotal,
}) => {
  const [itemsList, setItemsList] = useState([]);
  const [itemsListIdentifier, setItemsListIdentifier] = useState([]);

  const alert = useAlert();

  useEffect(() => {
    try {
      database
        .ref("bodega/" + identifier[currentCustomer] + "/list")
        .on("value", (snapshot) => {
          const items = [];
          const itemsIdentifier = [];

          snapshot.forEach((snap) => {
            items.push(snap.val());
            itemsIdentifier.push(snap.key);
          });

          setItemsList(items);
          setItemsListIdentifier(itemsIdentifier);
          findCurrentCustomerTotal(items);
        });
    } catch (error) {
      alert.show(error.message);
    }
  }, [identifier, currentCustomer, findCurrentCustomerTotal, alert]);

  const deleteItem = (index) => {
    database
      .ref(
        "bodega/" +
          identifier[currentCustomer] +
          "/list/" +
          itemsListIdentifier[index]
      )
      .remove()
      .then(() => alert.show("Item deleted"));
  };
  return (
    <div className="customer-items-list">
      {itemsList.map((item, index) => (
        <div key={index} className="item">
          <div className="item-details">
            <p> {item.description}</p>
            <p>Rs {item.price}</p>
          </div>
          <button onClick={() => deleteItem(index)} title="Paid">
            Paid
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomerItemsList;
