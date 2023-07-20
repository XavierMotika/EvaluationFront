import { useEffect, useState } from "react";


import "./style.css";
import { useNavigate } from "react-router-dom";
import { Button, Chip, TextField } from "@mui/material";
import Customer from "../../models/Customer";
import React from "react";
import CustomerService from "../../services/CustromerService";
import AuthenticationService from "../../services/authenticationService";
import CustomerTable from "../CustomerTable";


interface Props {
  customer: Customer;
}

const CustomerCard = ({customer}: Props) => {
  const defaultColor: string = "grey";
  const [color, setColor] = useState<string>(defaultColor);
  const navigate = useNavigate();
  const showBorder = () => {
    setColor("#4169e1");
  };
  const hideBorder = () => {
    setColor(defaultColor);
  };
  const toEditPage = () => {
      navigate("/edit/"+customer.id);
  };
  
  const deleteCustomer = () => {   
      CustomerService.delete(customer).then((ok)=>(
        ok? (
          window.location.reload()
        ) : ok.valueOf
      ));    
  }
  

  return (
    <article
      className="card"
      style={{ borderColor: color }}
      onMouseOver={showBorder}
      onMouseOut={hideBorder}
    >
    <div className="left">
        <div className="line">
        Numéro de client : {customer.id}
        </div>
        <div className="line"> Prénom : {customer.firstName}</div>
        <div className="line"> Nom : {customer.lastName}</div>
        <div className="line"> Adresse : {customer.adress}</div>
        <div className="line">Code Postal : {customer.zipCode}</div>
        <div className="line">Pays : {customer.country}</div>
       
        
    </div>
    <div className="right">
        
        <div className="contacts">
                {customer.contacts.map((contact) => (
                    <Chip
                    label= {contact.typeContact + " : "+ contact.value}
                    className="line"/>
                    ))}
        </div>
    </div>
    <div className="boutonsAdmin">
    {AuthenticationService.isAdmin()? 
    <>
      <Chip
        label="Modifier"
        onClick={toEditPage}
        variant="outlined"
        sx={{ marginRight: "10px" }}
        />
      <Chip
        label="Supprimer"
        onClick={deleteCustomer}
        variant="outlined"
        sx={{
          marginRight: "10px",
          fontWeight: "400",
          letterSpacing: "normal",
          textTransform: "none",
          lineHeight: "1.5",
          }}
        />        
    </>
    : null }
    </div>
    
    </article>
  );
};

export default CustomerCard;