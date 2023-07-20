
import Customer from "../models/Customer";
import AuthenticationService from "./authenticationService";

class CustomerService {

  static async getStartWith (filter: string ): Promise<Customer[] | undefined>   {
    



    if (filter !== "") {
        return fetch( "http://localhost:8080/GestionClient/?search=" + filter, {
            headers: {authorization : AuthenticationService.getJwt(),
            }
          }).then((customers) => customers.json())
            .catch((error)=>{
              console.error(error);
              throw error;
          })
    } else {
        return undefined;
    }  
      
  };

  static async save  (customer: Customer): Promise<boolean>  {
    return fetch( "http://localhost:8080/GestionClient/edit/" + customer.id, {
          method: 'POST',
          body: JSON.stringify(customer
        ),
          headers: {
            "Content-Type" :"application/json",
            authorization : AuthenticationService.getJwt(),
          }
        }).then((ok) => ok.json())
          .catch((error)=>{
            console.error(error);
            throw error;
    })
  }

  static async getOne  (id: string | undefined): Promise<Customer>  {
    return fetch("http://localhost:8080/GestionClient/"+id,{
      headers: {authorization : AuthenticationService.getJwt(),
      }
    }).then((customer) => customer.json())
      .catch((error)=>{
      console.error(error);
      throw error;
  })
  };
  
  static async delete (customer: Customer): Promise<boolean>  {
    return fetch( "http://localhost:8080/GestionClient/delete/" + customer.id, {
          method: 'DELETE',
          headers: {
            "Content-Type" :"application/json",
            authorization : AuthenticationService.getJwt(),
          }
        }).then((ok) => ok.json())
          .catch((error)=>{
            console.error(error);
            throw error;
    })
  }

}

export default CustomerService;