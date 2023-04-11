export class Attendee {
    private name: string;
    private address: string;
    private phoneNum: string;

    //Used to construct a new Attendee
    constructor(name:string, address:string, phoneNum:string) {
        this.name = name;
        this.address = address;
        this.phoneNum = phoneNum;
    }

    //Return the attendee's name
    getName() { return this.name; }

    //Return the attendee's address
    getAddress() { return this.address; }

    //Return the attendee's phone number
    getPhoneNum() { return this.phoneNum; }

    //Change the attendee's name
    setName(newName: string) { this.name = newName; }

    //Change the attendee's address
    setAddress(newAddress: string) { this.address = newAddress; }

    //Change the attendee's phone number
    setPhoneNum(newPhoneNum: string) { this.phoneNum = newPhoneNum; }
}