
import "./style.css";

import Customer from "../../models/Customer";
import React from "react";
import CustomerCard from "../CustomerCard";

interface Props {
  customers: Customer[] | undefined;
}

const CustomerTable = ({ customers }: Props) => {

  return (
    <>
      <section 
      className="shell">
        {customers?.map((customer: Customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
          />
        ))}
      </section>
    </>
  );
};

export default CustomerTable;