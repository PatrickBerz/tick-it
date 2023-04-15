import { Venue } from "./Venue";
import { SeasonTicketHolder } from "./SeasonTicketHolder";
import { Show } from "./Show";
import { Purchase } from "./Purchase";
import { Attendee } from "./Attendee";
import { SeatSection } from "./SeatSection";
import { Seat } from "./Seat";
import { Performance } from "./Performance";
import { JSONHandler } from "../JSONHandler";

export class System {
    private deserializer : JSONHandler = new JSONHandler();
    private venues : Venue[] = [];
    private shows : Show[] = [];
    private purchases : Purchase[] = [];
    private seasonTicketHolders : SeasonTicketHolder[] = [];

    //calls all the initializer functions
    constructor(filePath: string) {
        this.venues = this.initializeVenues(filePath);
        this.shows = this.initializeShows(filePath);
        this.purchases = this.initializePurchases(filePath);
        this.seasonTicketHolders = this.initializeSeasonHolders(filePath);
    }

    //initializing each database from the given file
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

    //creating new objects for the database
    createPurchase(purchaser : Attendee) : Purchase 
    {
        let newPurchase = new Purchase(purchaser);
        this.purchases.push(newPurchase);
        return newPurchase;
    }
    
    createVenue(seatSections : SeatSection[]) : Venue
    {
        let newVenue = new Venue(seatSections);
        this.venues.push(newVenue);
        return newVenue;
    }

    createShow(venue : Venue, showName : string) : Show
    {
        let newShow = new Show(venue, showName);
        this.shows.push(newShow);
        return newShow;
    }

    createSeasonHolder(name : string, address : string, phoneNum : string, seatAssignment : Seat) : SeasonTicketHolder
    {
        let newHolder = new SeasonTicketHolder(name, address, phoneNum, seatAssignment);
        this.seasonTicketHolders.push(newHolder);
        return newHolder;
    }

    createPerformance(performanceName : string, venueName : string, dateTime : Date, venueObj : Venue) {
        let show : Show | null = this.findShow(performanceName);
        if (show == null) show = this.createShow(venueObj, performanceName);
        let performance : Performance = new Performance(performanceName, venueName, dateTime, venueObj);
        show.addPerformance(performance);
        return performance;

    }

    //whole buncha getters yeehaw
    getVenues() : Venue[]
    {
        return this.venues;
    }

    getShows() : Show[]
    {
        return this.shows;
    }

    getPurchases() : Purchase[]
    {
        return this.purchases;
    }

    getSeasonTicketHolders() : SeasonTicketHolder[]
    {
        return this.seasonTicketHolders;
    }

    findShow(showName : string) : Show | null
    {
        for (var index in this.shows)
        {
            if (this.shows[index].getShowName() == showName)
            {
                return this.shows[index];
            }
        }
        return null;
    }

    findPurchase(confNum : number) : Purchase | null
    {
        for (var index in this.purchases) 
        {
            if (this.purchases[index].getConfNum() == confNum) 
                return this.purchases[index];
        }
        return null;
    }

    findPerformance(showName : string, venueName: string, dateTime : Date) : Performance | null
    {
        let show : Show | null = this.findShow(showName);
        if (show == null) return null; 
        for(var index in show.getPerformances())
        {
            if(show.getPerformances[index].getVenueName() == venueName 
            && show.getPerformances[index].getDateTime() == dateTime)
            return show.getPerformances[index];
        }
        return null;
    }
    
}