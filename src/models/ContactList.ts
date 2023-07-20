import Contact from "./Contact";

export default class ContactList {
    phone : Contact | undefined;
    email: Contact | undefined;
    fax: Contact | undefined;
    mobile : Contact | undefined;
  
    constructor(
        phone : Contact | undefined = undefined,
        email: Contact | undefined = undefined,
        fax: Contact | undefined = undefined,
        mobile : Contact | undefined = undefined,
      
    ) {
      this.phone = phone;
      this.email = email;
      this.fax = fax;
      this.mobile = mobile;
    }
  }