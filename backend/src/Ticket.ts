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

    //Used to create a new Ticket
    constructor(performance:string, seat:Seat) {
        this.performance = performance;
        this.seat = seat;

        this.ticketStatus = TicketStatus.Unsold;
        this.price = seat.getDefaultPrice();
    }

    //Return the status of the ticket
    getTicketStatus() { return this.ticketStatus}

    //Change the status of the ticket
    setTicketStatus(ticketStatus: TicketStatus) { this.ticketStatus = ticketStatus}

    //Change the price of the ticket
    setPrice(price: number) { this.price = price; }

    //Return the price of the ticket
    getPrice() { return this.price; }

    //Return the performance name the ticket is for
    getPerformance() { return this.performance };

    //Return the seat of the ticket
    getSeat() { return this.seat };
}