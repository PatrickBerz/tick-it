import { Attendee } from "./Attendee"; //Import Attendee class
import { Seat } from "./Seat"; //Import Seat class

export class SeasonTicketHolder extends Attendee {
    private seatAssignment: Seat;
    
    //Used to construct a new SeasonTicketHolder
    constructor(name:string, address:string, phoneNum:string, seatAssignment:Seat) {
        super(name, address, phoneNum);
        this.seatAssignment = seatAssignment;
    }

    //Return the Seat of the Season Ticket Holder
    getSeatAssignment() { return this.seatAssignment; }

    //Change the Seat of the Season Ticket Holder
    setSeatAssignment(newSeat: Seat) { this.seatAssignment = newSeat; }
}