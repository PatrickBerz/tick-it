import { Seat } from "./Seat"; //Import Seat class

export enum TicketStatus {
    Unsold,
    Reserved,
    Paid,
    PickedUp
}

export class Ticket {

    private performance: string;
    private seat: Seat;
    private ticketStatus: TicketStatus;
    private price: number;

    constructor(performance:string, seat:Seat) {
        
        this.performance = performance;
        this.seat = seat;

        this.ticketStatus = TicketStatus.Unsold;
        this.price = seat.getDefaultPrice();
    }

    getTicketStatus() { return this.ticketStatus}

    setTicketStatus(ticketStatus: TicketStatus) { this.ticketStatus = ticketStatus}

    setPrice(price: number) { this.price = price; }

    getPrice() { return this.price; }

    getPerformance() { return this.performance };

    getSeat() { return this.seat };

}