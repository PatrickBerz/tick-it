import { Venue } from "./Venue";
import { SeasonTicketHolder } from "./SeasonTicketHolder";
import { Show } from "./Show";
import { Purchase } from "./Purchase";
import { Attendee } from "./Attendee";
import { JSONHandler } from "../JSONHandler";
export class System {
    private deserializer : JSONHandler = new JSONHandler();
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

    private initializeVenues(filePath : string) : Venue[] 
    {
        this.deserializer.deserializeVenue(filePath);
        return this.deserializer.getData();
    }

    private initializeShows(filePath : string) : Show[] 
    {
        this.deserializer.deserializeShow(filePath);
        return this.deserializer.getData();
    }

    private initializePurchases(filePath : string) : Purchase[] 
    {
        this.deserializer.deserializePurchase(filePath);
        return this.deserializer.getData();
    }

    private initializeSeasonHolders(filePath : string) : SeasonTicketHolder[] 
    {
        this.deserializer.deserializeSeasonTicketHolder(filePath);
        return this.deserializer.getData();
    }

    createPurchase(name:string, address:string, phoneNum:string) : Purchase 
    {
        let newPurchase = new Purchase(new Attendee(name, address, phoneNum));
        this.purchases.push(newPurchase);
        return newPurchase;
    }
}