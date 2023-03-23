import { Attendee } from "./Attendee"; //Import Attendee class
import { Ticket } from "./Ticket"; //Import Ticket class
import { TicketStatus } from "./Ticket"; //Import TicketStatus enums

export class Purchase {
    private confNum: number;
    private purchaser: Attendee;
    private tickets: Ticket[];

    constructor(purchaser: Attendee) {
        this.purchaser = purchaser;
    }

    getConfNum() { return this.confNum; }

    getPurchaser() { return this.purchaser; }

    getTickets() { return this.tickets; }

    updateTickets(newTickets: Ticket[]) { this.tickets = newTickets; }

    calcTotalPrice() {
        let totalPrice = 0.0;
        for (var ticket in this.tickets) {
            totalPrice += this.tickets[ticket].getPrice();
        }
    }

    pickUpTickets() {
        for (var ticket in this.tickets) {
            this.tickets[ticket].setTicketStatus(TicketStatus.PickedUp);
        }
    }

    payTickets() {
        for (var ticket in this.tickets) {
            this.tickets[ticket].setTicketStatus(TicketStatus.Paid);
        }
    }
}