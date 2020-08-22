import React, { useState } from "react";

import "./customer.styles.scss";
import CustomerCard from "../customer-card/customer-card.component";
import CustomerItemsList from "../customer-items-list/customer-items-list.component";

const Customer = ({ customerDetails, currentCustomer, identifier }) => {
  const [currentCustomerTotal, setCurrentCustomerTotal] = useState(0);

  const findCurrentCustomerTotal = (itemlist) => {
    var total = 0;
    for (let i = 0; i < itemlist.length; i++) {
      total += parseInt(itemlist[i].price);
    }
    setCurrentCustomerTotal(total);
  };
  return (
    <div className="user-data">
      <CustomerCard
        currentCustomer={currentCustomer}
        customerDetails={customerDetails}
        identifier={identifier}
        currentCustomerTotal={currentCustomerTotal}
      />
      <CustomerItemsList
        currentCustomer={currentCustomer}
        customerDetails={customerDetails}
        identifier={identifier}
        findCurrentCustomerTotal={findCurrentCustomerTotal.bind(this)}
      />
    </div>
  );
};

export default Customer;
