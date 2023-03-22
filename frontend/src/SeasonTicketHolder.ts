import { Attendee } from "./Attendee"; //Import Attendee class
import { Seat } from "./Seat"; //Import Seat class

export class SeasonTicketHolder extends Attendee {
    private seatAssignment: Seat;
    
    /*constructor(name:string, address:string, phoneNum:string, seatAssignment:Seat) {
        super.constructor(name, address, phoneNum);
        this.seatAssignment = seatAssignment;
    }*/

    getSeatAssignment() { return this.seatAssignment; }

    setSeatAssignment(newSeat: Seat) { this.seatAssignment = newSeat; }
}