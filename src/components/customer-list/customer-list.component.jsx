import React from "react";
import { Link } from "react-router-dom";
import "./customer-list.styles.scss";
const CustomerList = ({ customerDetails, changeCurrentUser }) => {
  return (
    <div className="customers">
      <div className="go-to-add-customer">
        <h2>Customers</h2>
        <Link to="/addcustomer" title="Add New Customer">
          <ion-icon name="person-add-sharp"></ion-icon>
        </Link>
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
