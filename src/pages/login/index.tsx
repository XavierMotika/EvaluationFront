import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthenticationService from "../../services/authenticationService";
import React from "react";

import "./style.css"

interface Props {
  setIsAuthenticated: Function;
}

const Login = ({ setIsAuthenticated }: Props) => {
  const [error, setError] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .required("obligatoire")
      .test("3len", "au moins 3 caractères", (val: string) => val.length >= 3),
    password: yup
      .string()
      .required("obligatoire")
      .test("3len", "au moins 3 caractères", (val: string) => val.length >= 3),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
       AuthenticationService.login(
        values.login,
        values.password
      ).then((ok)=>{
        setIsAuthenticated(ok);
        setError(!ok);
      });
    },
    
  });

  return (
    <Box className="shell">
      <h1>
        Connexion à l'application de gestion clients
      </h1>
     
        <div 
        className="form">
        <form 
        className="form"
        onSubmit={formik.handleSubmit}>
        
          <Box
          display={"flex"}
          >
            <h3
            className="Label">username</h3>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
              type="password"
              name="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
          display={"flex"}>
          <h3
            className="Label">password</h3>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              size="small"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box display={"flex"} m="20px">
            <Button type="submit" variant="contained" sx={{ pl: "20px" }}>
              Connexion
            </Button>
          </Box>
          <Box display={"flex"} justifyContent="center" color={red}>
            {error ? "connexion impossible" : ""}
          </Box>
        </form>
        </div>
    </Box>
      
    
    
  );
};

export default Login;
