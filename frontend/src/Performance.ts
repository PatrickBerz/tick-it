import { Ticket } from "./Ticket"; //Import Ticket class
import { TicketStatus } from "./Ticket"; //Import TicketStatus enum
import { Venue } from "./Venue";

export class Performance {

    private performanceName: string;
    private venueName: string;
    private dateTime: Date;
    private tickets: Ticket[];

    constructor(performanceName: string, venueName: string, dateTime: Date) {
        
        this.performanceName = performanceName;
        this.venueName = venueName;
        this.dateTime = dateTime;
        this.tickets = [];
    }

    getPerformanceName() { return this.performanceName };

    getVenueName() { return this.venueName };

    getDateTime() { return this.dateTime}

    getTickets() { return this.tickets}

    setTickets(tickets: Ticket[]) { this.tickets = tickets };

    makeTickets(venue:Venue) {
        
        let tickets:Ticket[] = [];

        venue.getSections().forEach(section => {
            section.getSeats().forEach(seat => {
                let newTicket:Ticket = new Ticket(this.performanceName, seat);
                tickets.push(newTicket);
            });
        });

        this.tickets = tickets;
    }
}