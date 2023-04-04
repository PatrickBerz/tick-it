import { threadId } from "worker_threads";
import { Attendee } from "./Attendee"; //Import Attendee class
import { Ticket } from "./Ticket"; //Import Ticket class
import { TicketStatus } from "./Ticket"; //Import TicketStatus enums

export class Purchase {
    private confNum: number;
    private purchaser: Attendee;
    private tickets: Ticket[];

    constructor(purchaser: Attendee) {
        this.purchaser = purchaser;
        this.confNum = 0;
        this.tickets = [];
    }

    getConfNum() { return this.confNum; }

    setConfNum(confNum: number) { this.confNum = confNum; }

    getPurchaser() { return this.purchaser; }

    getTickets() { return this.tickets; }

    updateTickets(newTickets: Ticket[]) { this.tickets = newTickets; }

    calcTotalPrice() {
        let totalPrice = 0.0;
        for (var index in this.tickets) {
            totalPrice += this.tickets[index].getPrice();
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
}
