import { Attendee } from "./Attendee"; //Import Attendee class
import { Ticket } from "./Ticket"; //Import Ticket class
import { TicketStatus } from "./Ticket"; //Import TicketStatus enums

export class Purchase {
    private confNum: number;
    private purchaser: Attendee;
    private tickets: Ticket[];

    constructor(purchaser: Attendee, confNum: number, tickets: Ticket[]) {
        this.purchaser = purchaser;
        this.confNum = confNum;
        this.tickets = tickets;
        this.reserveTickets();
    }

    getConfNum() { return this.confNum; }

    getPurchaser() { return this.purchaser; }

    getTickets() { return this.tickets; }

    updateTickets(newTickets: Ticket[]) { this.tickets = newTickets; }

    calcTotalPrice() {
        let totalPrice = 0.0;
        for (var index in this.tickets) {
            totalPrice += this.tickets[index].getPrice();
        }

        return totalPrice;
    }

    reserveTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.Reserved);
        }
    }

    pickUpTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.PickedUp);
        }
    }

    payTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.Paid);
        }
    }

    returnTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.Unsold);
        }   
    }
}
