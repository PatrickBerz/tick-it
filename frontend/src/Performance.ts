import { Show } from "./Show"; //Import Show class
import { Ticket } from "./Ticket"; //Import Ticket class
import { TicketStatus } from "./Ticket"; //Import TicketStatus enum
import { Venue } from "./Venue";

export class Performance {

    private show: Show;
    private dateTime: Date;
    private tickets: Ticket[];

    constructor(show: Show, dateTime: Date) {
        
        this.show = show;
        this.dateTime = dateTime;

        this.tickets = this.makeTickets(this.show.getVenue())
    }

    getShow() { return this.show}

    getDateTime() { return this.dateTime}

    getTickets() { return this.tickets}

    private makeTickets(venue:Venue) {
        
        let tickets:Ticket[] = [];

        venue.getSections().forEach(section => {
            section.getSeats().forEach(seat => {
                let newTicket:Ticket = new Ticket(this, seat);
                tickets.push(newTicket);
            });
        });

        return tickets;
    }
}