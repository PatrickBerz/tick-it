import { Ticket } from "./Ticket"; //Import Ticket class
import { TicketStatus } from "./Ticket"; //Import TicketStatus enum
import { Venue } from "./Venue";

export class Performance {
    private performanceName: string;
    private venueName: string;
    private dateTime: Date;
    private tickets: Ticket[];

    //Used to construct a new Performance
    constructor(performanceName: string, venueName: string, dateTime: Date) {
        this.performanceName = performanceName;
        this.venueName = venueName;
        this.dateTime = dateTime;
        this.tickets = [];
    }

    //Return the name of a performance
    getPerformanceName() { return this.performanceName };

    //Return the name of the venue
    getVenueName() { return this.venueName };

    //Return the date and time
    getDateTime() { return this.dateTime}

    //Return the collection of tickets
    getTickets() { return this.tickets}

    //Change the collection of tickets
    setTickets(tickets: Ticket[]) { this.tickets = tickets };

    //Generate a collection of tickets based on the Venue object
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