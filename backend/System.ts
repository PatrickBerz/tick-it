import { Seat } from "../frontend/src/Seat";
import { Ticket } from "../frontend/src/Ticket";
import { Performance } from "../frontend/src/Performance";
import { SeatSection } from "../frontend/src/SeatSection";
import { Attendee } from "../frontend/src/Attendee";
import { Venue } from "../frontend/src/Venue";
import { SeasonTicketHolder } from "../frontend/src/SeasonTicketHolder";
import { Show } from "../frontend/src/Show";
import { Purchase } from "../frontend/src/Purchase";
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