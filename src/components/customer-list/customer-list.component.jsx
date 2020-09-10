import React from "react";
import { Link } from "react-router-dom";
import "./customer-list.styles.scss";
const CustomerList = ({ customerDetails, changeCurrentUser }) => {
  return (
    <div className="customers">
      <div className="go-to-add-customer">
        <Link to="/addcustomer" title="Add New Customer">
          <ion-icon name="person-add-sharp"></ion-icon>
        </Link>
        <h2>Customers</h2>
      </div>
      <div className="customers-list">
        {customerDetails.map((customers, index) => {
          return (
            <p key={index} onClick={() => changeCurrentUser(index)}>
              {customers.customerName}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerList;
