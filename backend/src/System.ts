import { Venue } from "./Venue";
import { SeasonTicketHolder } from "./SeasonTicketHolder";
import { Show } from "./Show";
import { Purchase } from "./Purchase";
import { Attendee } from "./Attendee";
import { SeatSection } from "./SeatSection";
import { Seat } from "./Seat";
import { Performance } from "./Performance";
import { JSONHandler } from "../JSONHandler";
import { Ticket } from "./Ticket";
import { ConfNum } from "./ConfNum";
import { CSVHandler } from "../CSVHandler";

//NOT A SINGLETON
//Needs to be able to handle a new start where there are no files to pull from

export class System {
    private static deserializer : JSONHandler = new JSONHandler();
    private static csv_deserializer : CSVHandler = new CSVHandler();
    private static venuePath : string = __dirname + "/../" + "/sampleVenue.json";
    private static showPath : string = __dirname + "/../" + "/test8.json";
    private static purchasePath : string = __dirname + "/../" + "/purchases.json";
    private static seasonPath : string = __dirname + "/../" + "/seasonTicketHolders.json";
    private static venues : Venue[] = this.initializeVenues(this.venuePath);
    private static shows : Show[] = this.initializeShows(this.showPath);
    private static purchases : Purchase[] = this.initializePurchases(this.purchasePath);
    private static seasonTicketHolders : SeasonTicketHolder[] = this.initializeSeasonHolders(this.seasonPath);

    //initializing each database from the given file
    private static initializeVenues(filePath : string) : Venue[] 
    {
        this.deserializer.deserializeVenue(filePath);
        return this.deserializer.getData();
    }

    private static initializeShows(filePath : string) : Show[] 
    {
        this.deserializer.deserializeShow(filePath);
        return this.deserializer.getData();
    }

    private static initializePurchases(filePath : string) : Purchase[] 
    {
        this.deserializer.deserializePurchase(filePath);
        let purchases : Purchase[] = this.deserializer.getData();
        return purchases.sort((n1, n2) => n1.getConfNum() - n2.getConfNum());
    }

    private static initializeSeasonHolders(filePath : string) : SeasonTicketHolder[] 
    {
        this.deserializer.deserializeSeasonTicketHolder(filePath);
        return this.deserializer.getData();
    }

    //creating new objects for the database
    public static createPurchase(purchaser : Attendee, tickets: Ticket[], dateTime: Date)// : Purchase 
    {
        let newPurchase = new Purchase(purchaser);
        newPurchase.updateTickets(tickets);
        newPurchase.setConfNum(ConfNum.getNum());
        newPurchase.setDate(dateTime);
        this.purchases.push(newPurchase);
        this.deserializer.serialize(this.purchases, this.purchasePath);
        //this.insertIntoPurchases(newPurchase);
        //return newPurchase;
    }

    // private insertIntoPurchases(purchase : Purchase, start? : number, end? : number)
    // {
    //     if(this.purchases.length == 0) return this.purchases.push(purchase);
    //     if(typeof start == 'undefined') start = 0;
    //     if(typeof end == 'undefined') end = this.purchases.length;
    //     var pivot = (start + end) >> 1;
    //     var comp = purchase.getConfNum() - this.purchases[pivot].getConfNum();
    //     if (end - start <= 1)
    //     {
    //         if (comp < 0) return this.purchases.splice(pivot - 1, 0, purchase);
    //         else return this.purchases.splice(pivot, 0, purchase);
    //     }
    //     if (comp < 0) return this.insertIntoPurchases(purchase, start, pivot);
    //     else if (comp > 0) return this.insertIntoPurchases(purchase, pivot, end);
    //     else return this.purchases.splice(pivot, 0, purchase);
    // } 
    
    public static createVenue(seatSections : SeatSection[]) : Venue
    {
        let newVenue = new Venue(seatSections);
        this.venues.push(newVenue);
        this.deserializer.serialize(this.venues, this.venuePath);
        return newVenue;
    }

    public static createShow(venue : Venue, showName : string) : Show
    {
        let newShow = new Show(venue, showName);
        this.shows.push(newShow);
        this.deserializer.serialize(this.shows, this.showPath);
        return newShow;
    }

    public static createSeasonHolder(name : string, address : string, phoneNum : string, seatAssignment : Seat) : SeasonTicketHolder
    {
        let newHolder = new SeasonTicketHolder(name, address, phoneNum, seatAssignment);
        this.seasonTicketHolders.push(newHolder);
        this.deserializer.serialize(this.seasonTicketHolders, this.seasonPath);
        return newHolder;
    }

    public static createPerformance(performanceName : string, venueName : string, dateTime : Date, venueObj : Venue) {
        let show : Show | null = this.findShow(performanceName);
        if (show == null) show = this.createShow(venueObj, performanceName);
        let performance : Performance = new Performance(performanceName, venueName, dateTime, venueObj);
        show.addPerformance(performance);
        this.deserializer.serialize(this.shows, this.showPath);
        return performance;
    }

    //whole buncha getters yeehaw
    public static getVenues() : Venue[]
    {
        return this.venues;
    }

    public static getShows() : Show[]
    {
        return this.shows;
    }

    public static getPurchases() : Purchase[]
    {
        return this.purchases;
    }

    public static getSeasonTicketHolders() : SeasonTicketHolder[]
    {
        return this.seasonTicketHolders;
    }

    //Find either of the two venues
    public static findVenue(venueNum : number) : Venue | null
    {
        if (venueNum == 0) {
            return this.venues[0];
        } else if (venueNum == 1) {
            return this.venues[1];
        } else { return null; }
    }

    public static findShow(showName : string) : Show | null
    {
        for (var index in this.shows)
        {
            if (this.shows[index].getShowName() === showName)
            {
                return this.shows[index];
            }
        }
        return null;
    }

    public static findPurchase(confNum : number, start? : number, end? : number) : Purchase | null
    {
        if(typeof start == 'undefined') start = 0;
        if(typeof end == 'undefined') end = this.purchases.length;
        var pivot = (start + end) >> 1;
        var comp = confNum - this.purchases[pivot].getConfNum();
        if (end - start <= 1)
        {
            if (comp !== 0) return null;
            else return this.purchases[pivot];
        }
        if (comp < 0) return this.findPurchase(confNum, start, pivot);
        else if (comp > 0) return this.findPurchase(confNum, pivot, end);
        else return this.purchases[pivot];
    }
    
    public static findPerformance(perfToFind: Performance) {
        for (var index in this.shows) {
            for (var index2 in this.shows[index].getPerformances()) {
                console.log("IN LOOP")
                console.log(JSON.stringify(this.shows[index].getPerformances()[index2].getPerformanceName()))
                console.log(JSON.stringify(this.shows[index].getPerformances()[index2].getDateTime()))
                console.log(perfToFind.getDateTime())
                console.log(JSON.stringify(this.shows[index].getPerformances()[index2].getVenueName()))
                
                console.log("COMP SHOW")
                console.log(JSON.stringify(perfToFind.getPerformanceName()))
                console.log(JSON.stringify(perfToFind.getDateTime()))
                console.log(typeof(perfToFind.getDateTime()))
                console.log(JSON.stringify(perfToFind.getVenueName()))
                if (this.shows[index].getPerformances()[index2].equals(perfToFind)) {
                    console.log("FOUND THE PERFORMANCE TO DELETE")
                    //this.shows[index].getPerformances().splice(+index2, 1);
                    return this.shows[index].getPerformances()[index2]
                }
            }
        }
    }

    public static removePerformance(perfToDelete: Performance) {
        for (var index in this.shows) {
            for (var index2 in this.shows[index].getPerformances()) {
                if (this.shows[index].getPerformances()[index2].equals(perfToDelete)) {
                    console.log("Deleted Performance")
                    this.shows[index].getPerformances().splice(+index2, 1);
                }
            }
        }
    }

    //Used to import data for Season Ticket Holders from a JSON or CSV file
    public static importSeasonTicketHolderData(filePath: string) {
        //See if it is CSV or JSON
        //console.log("THE DAMN FILEPATH: ", filePath);
        let fileExt: any = filePath.split('.').pop();
        //Call the appropriate handler based on if it's CSV or JSON
            //Both handlers default to serializing seasonTicketHolders.json
        console.log(filePath);
        if (fileExt == "csv") {
            this.csv_deserializer.importCSV(filePath);
        }
        if (fileExt == "json") {
            this.deserializer.importJSON(filePath);
        }
        
        //Re-serialize the seasonTicketHolder data in System
        this.deserializer.deserializeSeasonTicketHolder(this.seasonPath);
        this.seasonTicketHolders = this.deserializer.getData();
        console.log("PLEASE WORKKKKKK");
        //console.log(this.seasonTicketHolders);
    }

    //Used to export data for Season Ticket Holders to a JSON or CSV file 
    public static exportSeasonTicketHolderData(choice: string) {
        if (choice == "json") {
            this.deserializer.exportJSON(this.seasonTicketHolders);
        } else {
            this.csv_deserializer.exportCSV(this.seasonTicketHolders);
        }
    }
    
}

//System.importSeasonTicketHolderData("C:/Users/jayde/Documents/GitHub/tick-it/backend/seasonTH.csv");