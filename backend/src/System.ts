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
        let purchases : Purchase[] = this.deserializer.getData();
        return purchases.sort((n1, n2) => n1.getConfNum() - n2.getConfNum());
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
        this.insertIntoPurchases(newPurchase);
        return newPurchase;
    }

    private insertIntoPurchases(purchase : Purchase, start? : number, end? : number)
    {
        if(this.purchases.length == 0) return this.purchases.push(purchase);
        if(typeof start == 'undefined') start = 0;
        if(typeof end == 'undefined') end = this.purchases.length;
        var pivot = (start + end) >> 1;
        var comp = purchase.getConfNum() - this.purchases[pivot].getConfNum();
        if (end - start <= 1)
        {
            if (comp < 0) return this.purchases.splice(pivot - 1, 0, purchase);
            else return this.purchases.splice(pivot, 0, purchase);
        }
        if (comp < 0) return this.insertIntoPurchases(purchase, start, pivot);
        else if (comp > 0) return this.insertIntoPurchases(purchase, pivot, end);
        else return this.purchases.splice(pivot, 0, purchase);
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

    findPerformance(showName : string, dateTime : Date) : Performance | null
    {
        let show : Show | null = this.findShow(showName);
        if (show == null) return null; 
        for(var index in show.getPerformances())
        {
            if(show.getPerformances[index].getDateTime() == dateTime)
            return show.getPerformances[index];
        }
        return null;
    }
    
}