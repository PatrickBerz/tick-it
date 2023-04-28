import { Venue } from "./Venue";
import { SeasonTicketHolder } from "./SeasonTicketHolder";
import { Show } from "./Show";
import { Purchase } from "./Purchase";
import { Attendee } from "./Attendee";
import { SeatSection } from "./SeatSection";
import { Seat } from "./Seat";
import { Performance } from "./Performance";
import { JSONHandler } from "../JSONHandler";
import { Ticket, TicketStatus } from "./Ticket";
import { ConfNum } from "./ConfNum";
import { CSVHandler } from "../CSVHandler";

//NOT A SINGLETON
//Needs to be able to handle a new start where there are no files to pull from

export class System {
    //Updates back and forth between database files and class variables.
    private static deserializer : JSONHandler = new JSONHandler();
    private static csv_deserializer : CSVHandler = new CSVHandler();
    //The paths for the database files.
    private static venuePath : string = __dirname + "/../" + "/venues.json"; 
    private static showPath : string = __dirname + "/../" + "/shows.json";
    private static purchasePath : string = __dirname + "/.." + "/purchases.json";
    private static seasonPath : string = __dirname + "/../" + "/seasonTicketHolders.json";
    //The main system variables, which are initialized from the database files.
    private static venues : Venue[] = this.initializeVenues(this.venuePath);
    private static shows : Show[] = this.initializeShows(this.showPath);
    private static purchases : Purchase[] = this.initializePurchases(this.purchasePath);
    private static seasonTicketHolders : SeasonTicketHolder[] = this.initializeSeasonHolders(this.seasonPath);

    //Initializing each database from the given file.
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

    public static initializeSeasonHolders(filePath : string) : SeasonTicketHolder[] 
    {
        this.deserializer.deserializeSeasonTicketHolder(filePath);
        return this.deserializer.getData();
    }

    //Creating new objects for the database, and putting them back into their respective database file.
    public static createPurchase(purchaser : Attendee, tickets: Ticket[], dateTime: Date, ticketStatus: TicketStatus): Purchase | null 
    {
        //Getting a confirmation number for the purchase. If that confirmation number already exists, make a new one.
        let newConfNum = ConfNum.getNum()
        while (this.findPurchase(newConfNum)) {
            newConfNum = ConfNum.getNum()
        }

        //Creating the new purchase with the confirmation number and other attributes.
        let newPurchase = new Purchase(purchaser);
        newPurchase.updateTickets(tickets);
        newPurchase.setConfNum(newConfNum);
        newPurchase.setDate(dateTime);

        //Checking the ticket status and updating it.
        switch(ticketStatus) {
            case 1: {
                newPurchase.reservedTickets()
                break;
            }
            case 2: {
                newPurchase.payTickets()
                break;
            }
            case 3: {
                newPurchase.pickUpTickets()
                break;
            }
        }

        //Adding the new purchase to both the class and the necessary backup files.
        this.purchases.push(newPurchase);
        this.deserializer.serialize(this.purchases, this.purchasePath);
        this.deserializer.serialize(this.shows, this.showPath);

        return newPurchase;
    }
    
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

    //Additional function for backing up the Season Ticket Holders for classes without direct JSONHandler access.
    public static serializeSeasonHolders() {
        this.deserializer.serialize(this.seasonTicketHolders, this.seasonPath)
    }

    //Getter functions for each of the databases.
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

    //Finds either of the two possible venues.
    public static findVenue(venueNum : number) : Venue | null
    {
        if (venueNum == 0) {
            return this.venues[0];
        } else if (venueNum == 1) {
            return this.venues[1];
        } else { return null; }
    }

    //Finds a show in the database given the show's name.
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

    //Finds a purchase given its confirmation number. 
    public static findPurchase(confNum: number) : Purchase | undefined { 
        let test

        System.purchases.forEach(purchase => {
            if (confNum == purchase.getConfNum()) {
                test = purchase
            }
        })
        return test
    }

    //Finds a given performance given that performance's already known data.
    public static findPerformance(perfToFind: Performance) {
        for (var index in this.shows) {
            for (var index2 in this.shows[index].getPerformances()) {
                if (this.shows[index].getPerformances()[index2].equals(perfToFind)) {
                    return this.shows[index].getPerformances()[index2]
                }
            }
        }
    }

    //Finds a performance and then removes it.
    public static removePerformance(perfToDelete: Performance) {
        for (var index in this.shows) {
            for (var index2 in this.shows[index].getPerformances()) {
                if (this.shows[index].getPerformances()[index2].equals(perfToDelete)) {
                    //Find purchases of that performance and mark the tickets as Cancelled
                    for (var purchaseIndex in this.purchases) {
                        let testPerf = new Performance(this.purchases[purchaseIndex].getTickets()[0].getPerformance(), "Venue", new Date(this.purchases[purchaseIndex].getDate()), System.getVenues()[0]);
                        if (testPerf.equals(perfToDelete)) {
                            this.purchases[purchaseIndex].cancelTickets();
                        }
                    }

                    //Remove the performance from the database
                    this.shows[index].getPerformances().splice(+index2, 1);
                    this.deserializer.serialize(this.purchases, this.purchasePath);
                    this.deserializer.serialize(this.shows, this.showPath);
                }
            }
        }
    }

    //Used to import data for Season Ticket Holders from a JSON or CSV file
    public static importSeasonTicketHolderData() {
        this.seasonTicketHolders = this.initializeSeasonHolders(this.seasonPath);
    }

    //Used to export data for Season Ticket Holders to a JSON or CSV file 
    public static exportSeasonTicketHolderData(choice: string) {
       if (choice == "json") {
            this.deserializer.exportJSON(this.seasonTicketHolders);
        } else {
            this.csv_deserializer.exportCSV(this.seasonTicketHolders);
        }
    }

    //Finds a purchase and then removes it.
    public static removePurchase(purchToDelete: Purchase) {
        for (let index in this.purchases) {
            if ( this.purchases[index].getConfNum() == purchToDelete.getConfNum()) {
                this.purchases.splice(+index, 1)
            }
        }
    }
}