import { Attendee } from "./Attendee"; //Import Attendee class
import { Ticket } from "./Ticket"; //Import Ticket class
import { TicketStatus } from "./Ticket"; //Import TicketStatus enums

export class Purchase {
    private confNum: number;
    private purchaser: Attendee;
    private tickets: Ticket[];
    private perfDateTime: Date;

    //Used to construct a new Purchase
    constructor(purchaser: Attendee) {
        this.purchaser = purchaser;
        this.confNum = 0;
        this.tickets = [];
        this.perfDateTime = new Date();
    }

    //Return the confirmation number of the purchase
    getConfNum() { return this.confNum; }

    //Change the confirmation number of the purchase
    setConfNum(confNum: number) { this.confNum = confNum; }

    //Return the purchaser of the purchase
    getPurchaser() { return this.purchaser; }

    //Return the collection of tickets in the purchase
    getTickets() { return this.tickets; }

    //Change the collection of tickets in the purchase
    updateTickets(newTickets: Ticket[]) { this.tickets = newTickets; }

    //Change the date and time of the Performance on the Purchase
    setDate(performanceDateTime: Date) { this.perfDateTime = performanceDateTime; }

    //Return the date and time of the Performance on the Purchase
    getDate() { return this.perfDateTime; }

    //Calculate the total price of the purchase based on the ticket prices
    calcTotalPrice() {
        let totalPrice = 0.0;
        for (var index in this.tickets) {
            totalPrice += this.tickets[index].getPrice();
        }

        return totalPrice;
    }

    //Mark the tickets in the purchase as Reserved
    reservedTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.Reserved);
        }
    }

    //Mark the tickets in the purchase as Picked Up
    pickUpTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.PickedUp);
        }
    }

    //Mark the tickets in the purchase as Paid
    payTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.Paid);
        }
    }

    //Mark tickets in the purchase as Unsold
    returnTickets() {
        for (var index in this.tickets) {
            this.tickets[index].setTicketStatus(TicketStatus.Unsold);
        }
    }
}