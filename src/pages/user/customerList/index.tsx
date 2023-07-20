import { useEffect, useState } from "react";
import Customer from "../../../models/Customer";
import SearchBar from "../../../components/SearchBar";
import React from "react";
import CustomerService from "../../../services/CustromerService";
import CustomerTable from "../../../components/CustomerTable";

import "./style.css"
import { Button } from "@mui/material";
import AuthenticationService from "../../../services/authenticationService";

const CustomerList = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>();
  
  useEffect(() => {
    CustomerService.getStartWith(searchText).then((customers)=>setCustomers(customers));
  }, [searchText]);

  function emptyCache(): void {
    AuthenticationService.deconnect()
    window.location.reload()
  }

  return (
    <div className="shellcL">
      <div className="top">
        <div className="logo"> Gestion clients </div>
        <SearchBar searchUpdate={setSearchText} />
      </div>
      <CustomerTable customers={customers} />
      <div
      className="bottom"> 
        <Button 
        onClick={emptyCache}
        className="button"
        color="primary"
        variant="contained"
        >
          Deconnexion
        </Button>
      </div>
      
    </div>
  );


  };
  
  export default CustomerList;