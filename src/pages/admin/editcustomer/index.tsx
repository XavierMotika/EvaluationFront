import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Customer from "../../../models/Customer";
import CustomerService from "../../../services/CustromerService";
import React from "react";
import { Box, Button, TextField } from "@mui/material";
import Contact from "../../../models/Contact";
import ContactList from "../../../models/ContactList";


const EditCustomer = () => {
    const params = useParams();
    const navigate = useNavigate();
      
    const [customer,setCustomer] = useState<Customer | undefined>();

  if (customer===undefined){
    CustomerService.getOne(params.id).then(
      (customer)=>setCustomer(customer)
    )
  }

    const validationSchema = yup.object().shape({
        id: yup
          .number()
          .required("obligatoire"),
        firstName: yup
          .string()
          .required("obligatoire")
          .max(100),
        lastName: yup
          .string()
          .required("obligatoire")
          .max(100),  
        adress: yup
          .string()
          .max(100),
        zipCode: yup
          .string()
          .max(10),
        country: yup
          .string()
          .max(100),
 
        
      });
    
      const formik = useFormik({
        
        initialValues: {
          id: customer ? customer.id : 0,
          firstName: customer ? customer.firstName : "undefined",
          lastName: customer ? customer.lastName : "undefined",
          adress: customer ? customer.adress : undefined,
          zipCode: customer ? customer.zipCode : undefined,
          country: customer ? customer.country : undefined,
          phoneId : customer ? findContactId(customer,"Téléphone") : undefined,
          phone: customer ? findContactValue(customer,"Téléphone") : undefined,
          emailId : customer ? findContactId(customer,"Email") : undefined,
          email: customer ? findContactValue(customer,"Email") : undefined,
          faxId : customer ? findContactId(customer,"Fax") : undefined,
          fax: customer ? findContactValue(customer,"Fax") : undefined,
          mobileId : customer ? findContactId(customer,"Portable") : undefined,
          mobile: customer ? findContactValue(customer,"Portable") : undefined,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
          let newContacts : Contact[] = [];
          if (values.phone!== undefined)
          newContacts.push( new Contact (
            values.phoneId,
            values.phone,
            "Téléphone"
          ))
          if (values.email!== undefined)
          newContacts.push( new Contact (
            values.emailId,
            values.email,
            "Email"
          ))
          if (values.fax!== undefined)
          newContacts.push( new Contact (
            values.faxId,
            values.fax,
            "Fax"
          ))
          if (values.mobile!== undefined)
          newContacts.push( new Contact (
            values.mobileId,
            values.mobile,
            "Portable"
          ))
          if (values.id !== undefined) {
            const updatedCustomer: Customer = new Customer(
              values.id,
              values.firstName,
              values.lastName,
              values.adress,
              values.zipCode,
              values.country,
              newContacts  
            );
            console.log(updatedCustomer)
            CustomerService.save(updatedCustomer).then((ok)=>{
            if (ok) {
              window.location.reload();
            }
          });
          }
        },
      });


      const backToCustomerList = () => {
          navigate("/");
      };

    return (

        <div
        className="editbox">
            <div
            className="topec">
                Gestion clients - formulaire d'édition
            </div>
            <div
            className="bottomec">
                <div
                className="formbox">
                    <form
                    className="formbox"
                    onSubmit={formik.handleSubmit}>
                      <div
                      className="form">
                      <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="number"
                                label="Numéro de client"
                                name="id"
                                size="small"
                                value={formik.values.id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.id && Boolean(formik.errors.id)}
                                helperText={formik.touched.id && formik.errors.id}
                                disabled={customer !== undefined}
                                />
                            <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Prénom"
                                name="firstName"
                                size="small"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Nom"
                                name="lastName"
                                size="small"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Adresse"
                                name="adress"
                                size="small"
                                value={formik.values.adress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.adress && Boolean(formik.errors.adress)}
                                helperText={formik.touched.adress && formik.errors.adress}
                                />
                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Code Postal"
                                name="zipCode"
                                size="small"
                                value={formik.values.zipCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                                helperText={formik.touched.zipCode && formik.errors.zipCode}
    
                                />
                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Pays"
                                name="country"
                                size="small"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}

                                />
                                
                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Téléphone"
                                name="phone"
                                size="small"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone  && formik.errors.phone}
                                />

                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Email"
                                name="email"
                                size="small"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email  && formik.errors.email}
                                />
                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Fax"
                                name="fax"
                                size="small"
                                value={formik.values.fax}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fax && Boolean(formik.errors.fax)}
                                helperText={formik.touched.fax  && formik.errors.fax}
                                />
                                <TextField
                                className="formLine"
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Portable"
                                name="mobile"
                                size="small"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile  && formik.errors.mobile}
                                />


                              </div>
                            
                      <div   className="buttons">
                  <Box
                  className="buttonec">
                    <Button 
                    className="buttonec"
                    type="submit" 
                    variant="contained" 
                    >
                                Engistrer
                    </Button>
                  </Box>
                  <Box
                    className="buttonec">
                      <Button 
                      className="buttonec"
                      onClick={backToCustomerList}
                      type="submit" 
                      variant="contained" 
                      >
                                Retour
                      </Button>
                  </Box>
                </div>
                    </form>
                </div>
                
            </div>
        </div>

    );
    
};

export default EditCustomer;

function findContactValue(customer : Customer, typeCont : string): string | undefined  {
    return customer.contacts.find((contact) => (contact.typeContact === typeCont))?.value;
}

function findContactId(customer : Customer, typeCont : string): number | undefined  {
  return customer.contacts.find((contact) => (contact.typeContact === typeCont))?.id;
}


