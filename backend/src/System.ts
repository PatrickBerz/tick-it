import { Seat } from "./Seat";
import { Ticket } from "./Ticket";
import { Performance } from "./Performance";
import { SeatSection } from "./SeatSection";
import { Attendee } from "./Attendee";
import { Venue } from "./Venue";
import { SeasonTicketHolder } from "./SeasonTicketHolder";
import { Show } from "./Show";
import { Purchase } from "./Purchase";
export class System {
    private venues : Venue[] = [];
    private shows : Show[] = [];
    private purchases : Purchase[] = [];
    private seasonTicketHolders : SeasonTicketHolder[] = [];

    constructor(filePath: string) {
        this.venues = this.initializeVenues(filePath);
        this.shows = this.initializeShows(filePath);
        this.purchases = this.initializePurchases(filePath);
        this.seasonTicketHolders = this.initializeSeasonHolders(filePath);
    }

    private initializeVenues(filePath : string) : Venue[] {return []} //temporary
    private initializeShows(filePath : string) : Show[] {return []}
    private initializePurchases(filePath : string) : Purchase[] {return []}
    private initializeSeasonHolders(filePath : string) : SeasonTicketHolder[] {return []}

    createPurchase(){}
}