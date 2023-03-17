import { Seat } from "./Seat"; //Import Seat class
import { Performance } from "./Performance" //Import Performance class

export enum TicketStatus {
    Unsold,
    Reserved,
    Paid,
    PickedUp
}

export class Ticket {

    private performance: Performance;
    private seat: Seat;
    private ticketStatus: TicketStatus;
    private price: number;

    constructor(performance:Performance, seat:Seat) {
        
        this.performance = performance;
        this.seat = seat;

        this.ticketStatus = TicketStatus.Unsold;
        this.price = seat.getDefaultPrice();
    }

    getTicketStatus() { return this.ticketStatus}

    setTicketStatus(ticketStatus: TicketStatus) { this.ticketStatus = ticketStatus}

    setPrice(price: number) { this.price = price; }

}