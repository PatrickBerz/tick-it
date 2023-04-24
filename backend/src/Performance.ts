import { Ticket } from "./Ticket"; //Import Ticket class
import { Venue } from "./Venue";
import { Seat } from "./Seat";

export class Performance {
    private performanceName: string;
    private venueName: string;
    private dateTime: Date;
    private tickets: Ticket[];

    //Used to construct a new Performance
    constructor(performanceName: string, venueName: string, dateTime: Date, venueObj: Venue) {
        this.performanceName = performanceName;
        this.venueName = venueName;
        this.dateTime = dateTime;
        this.tickets = [];
        this.makeTickets(venueObj);
    }

    //Return the name of a performance
    getPerformanceName() { return this.performanceName };

    //Return the name of the venue
    getVenueName() { return this.venueName };

    //Return the date and time
    getDateTime() { return new Date(this.dateTime)}

    //Return the collection of tickets
    getTickets() { return this.tickets}

    //Change the collection of tickets
    setTickets(tickets: Ticket[]) { this.tickets = tickets };

    //Generate a collection of tickets based on the Venue object
    private makeTickets(venue:Venue) {
      let tickets:Ticket[] = [];

       venue.getSections().forEach(section => {
            section.getSeats().forEach(seat => {
                let newTicket:Ticket = new Ticket(this.performanceName, seat);
                tickets.push(newTicket);
            });
        });

        this.tickets = tickets;
    }

    //Used to tell if two Performances are equal or not
    equals(compPerf: Performance) {
        if (this.performanceName == compPerf.getPerformanceName() &&
            this.dateTime.toISOString() === compPerf.getDateTime().toISOString()
            ) {
                return true;
            }
            else {
                return false;
            }
    }

    //Returns a list of all the seat objects under tickets that have been sold
    findSoldSeats() {
        let soldSeats : Seat[] = [];
        this.tickets.forEach(ticket => {
            //console.log(ticket.getTicketStatus());
            if (ticket.getTicketStatus() != 0) {
                soldSeats.push(ticket.getSeat());
            }
        });
        return soldSeats;
    }
}