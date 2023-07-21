import React , {FunctionComponent, useState, useEffect} from 'react';
import AuthenticationService from './services/authenticationService';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerList from './pages/user/customerList';
import EditCustomer from './pages/admin/editcustomer';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthenticationService.isAuthenticated
  );

  return isAuthenticated ? (
    <BrowserRouter>
    AuthenticationService.isAdmin()? (
      <Routes>
        <Route path="/" element={<CustomerList/>} />
        <Route path="/edit/:id" element={<EditCustomer/>} />   
    ) : (
         <Route path="/" element={<CustomerList/>} />
      </Routes>
    )
    </BrowserRouter>
  ) : (
    <Login  setIsAuthenticated={setIsAuthenticated}/>
  );
};

export default App;