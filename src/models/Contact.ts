export default class Contact {
    id : number | undefined;
    value: string;
    typeContact: string;
  
    constructor(
        id : number | undefined = undefined,
        value: string = "",
        typeContact: string = "",
      
    ) {
      this.id = id;
      this.value = value;
      this.typeContact = typeContact;
    }
  }