import React from "react";
import { Link } from "react-router-dom";
import "./customer-list.styles.scss";
const CustomerList = ({ customerDetails, changeCurrentUser }) => {
  return (
    <div className="customers">
      <h2>Customers</h2>

      <div className="customers-list">
        {customerDetails.map((customers, index) => {
          return (
            <p key={index} onClick={() => changeCurrentUser(index)}>
              {customers.customerName}
            </p>
          );
        })}
      </div>
      <div className="go-to-add-customer">
        <Link to="/addcustomer" title="Add New Customer">
          <ion-icon icon="person-add-sharp"></ion-icon>
        </Link>
      </div>
    </div>
  );
};

export default CustomerList;
