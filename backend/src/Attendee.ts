export class Attendee {
    private name: string;
    private address: string;
    private phoneNum: string;

    constructor(name:string, address:string, phoneNum:string) {
        this.name = name;
        this.address = address;
        this.phoneNum = phoneNum;
    }

    getName() { return this.name; }

    getAddress() { return this.address; }

    getPhoneNum() { return this.phoneNum; }

    setName(newName: string) { this.name = newName; }

    setAddress(newAddress: string) { this.address = newAddress; }

    setPhoneNum(newPhoneNum: string) { this.phoneNum = newPhoneNum; }
}