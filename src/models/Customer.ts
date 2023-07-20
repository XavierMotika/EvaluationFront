import Contact from "./Contact";

export default class Customer {
    id: number;
    firstName: string;
    lastName: string;
    adress: string;
    zipCode: string;
    country: string;
    contacts: Array<Contact>;
  
    constructor(
      id: number,
      firstName: string = "",
      lastName: string = "",
      adress: string = "",
      zipCode: string = "",
      country: string = "" ,
      contacts: Array<Contact> = []
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.adress = adress;
      this.zipCode = zipCode;
      this.country = country;
      this.contacts = contacts;
    }
  }