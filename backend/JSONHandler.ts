import { JsonSerializer } from 'typescript-json-serializer';
import { Seat } from "./src/Seat";
import { Ticket } from "./src/Ticket";
import { Performance } from "./src/Performance";
import { SeatSection } from "./src/SeatSection";
import { Attendee } from "./src/Attendee";
import { Venue } from "./src/Venue";
import { SeasonTicketHolder } from "./src/SeasonTicketHolder";
import { Show } from "./src/Show";
import { Purchase } from "./src/Purchase";
import * as fs from 'fs';

export class JSONHandler {
    private deserializedData : any[] = [];

    //Used to construct a new instance of the JSON Deserializer
    constructor() {
        this.deserializedData = [];
    }

    //Use to serialize any set of data to a given file path
    serialize(dataSet: any[], filePath : string) {
        this.deserializedData = []; //Set data to empty
        
        //Instantiate a default serializer
        const defaultSerializer = new JsonSerializer();

        //Convert the data from TypeScript objects to JSON data and save to the specified file 
        let data: string = defaultSerializer.serialize(dataSet) as unknown as string;
        let datastr = JSON.stringify(data);
        fs.writeFileSync(filePath, datastr);
    }

    //Create Seat objects from JSON file
    deserializeSeat(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScript Seat objects
        for (var index in dataSet) {
            let object = dataSet[index];
            let newSeat = new Seat(object["section"], object["row"], object["seatNum"], object["acessible"], object["inSeasonSection"], object["defaultPrice"]);
            this.deserializedData.push(newSeat);
        }
    }

    //Create Seat Section objects from JSON file
    deserializeSeatSection(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScript Seat objects
        for (var index in dataSet) {
            let objectSection = dataSet[index];

            //Deserialize and build the set of seats in the seat section
            let seats: Seat[] = [];
            let dataSetOfSeats: any[] = JSON.parse(JSON.stringify(objectSection["seats"])); //Have to stringify to get parser to accept
            for (var index in dataSetOfSeats) {
                let object = dataSetOfSeats[index];
                let newSeat = new Seat(object["section"], object["row"], object["seatNum"], object["acessible"], object["inSeasonSection"], object["defaultPrice"]);
                seats.push(newSeat);
            }

            //Create and push the new seat section
            let newSeatSection = new SeatSection(objectSection["section"], seats);
            this.deserializedData.push(newSeatSection);
        }
    }

    deserializePerformance(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the Performance Typescript objects
        for (var index in dataSet) {
            let objectPerformance = dataSet[index];

            //Deserialize and build the set of tickets in the performance
            let tickets: Ticket[] = [];
            let dataSetOfTickets: any[] = JSON.parse(JSON.stringify(objectPerformance["tickets"])); //Have to stringify to get parser to accept
            for (var index in dataSetOfTickets) {
                let objectTicket = dataSetOfTickets[index];

                //Deserialize and build the Seat for the ticket
                let seatData: any = JSON.parse(JSON.stringify(objectTicket["seat"])); //Have to stringify to get parser to accept
                let assignedSeat = new Seat(seatData["section"], seatData["row"], seatData["seatNum"], seatData["acessible"], seatData["inSeasonSection"], seatData["defaultPrice"]);

                let newTicket = new Ticket(objectTicket["performance"], assignedSeat);
                newTicket.setTicketStatus(objectTicket["ticketStatus"]);
                newTicket.setPrice(objectTicket["price"]);
                tickets.push(newTicket);
            }

            let dummySeat = new Seat("NA", "NA", 0, false, false, 0);
            let dummySeats : Seat[] = [];
            dummySeats.push(dummySeat);
            let dummySeatSectObj = new SeatSection("NA", dummySeats)
            let dummySections: SeatSection[] = [];
            dummySections.push(dummySeatSectObj);
            let dummyVenue = new Venue(dummySections);
            let newPerformance: Performance = new Performance(objectPerformance["performanceName"], objectPerformance["venueName"], new Date(objectPerformance["dateTime"]), dummyVenue);
            newPerformance.setTickets(tickets);
            this.deserializedData.push(newPerformance);
        }
    }

    //Create Attendee objects from JSON file
    deserializeAttendee(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScript Attendee objects
        for (var index in dataSet) {
            let object = dataSet[index];
            let newAttendee = new Attendee(object["name"], object["address"], object["phoneNum"]);
            this.deserializedData.push(newAttendee);
        }
    }

    //Create Show objects from JSON file
    deserializeShow(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScript Show objects
        for (var index in dataSet) {
            let objectShow = dataSet[index];

            //Deserialize and build the Venue for the ticket
            let dataOfVenue: any = JSON.parse(JSON.stringify(objectShow["venue"])); //Have to stringify to get parser to accept
            let seatSections: SeatSection[] = [];

            //Deserialize and build the set of seat sections in the venue
            let dataSetOfSeatSections: any[] = JSON.parse(JSON.stringify(dataOfVenue["seatSections"])); //Have to stringify to get parser to accept
            //Create the TypeScript SeatSection objects
            for (var index in dataSetOfSeatSections) {
                let objectSection = dataSetOfSeatSections[index];
                let seats: Seat[] = [];
                //Deserialize and build the set of seats in the seat section
                let dataSetOfSeats: any[] = JSON.parse(JSON.stringify(objectSection["seats"])); //Have to stringify to get parser to accept
                //Create the TypeScript Seat objects to put in SeatSection
                for (var index in dataSetOfSeats) {
                    let object = dataSetOfSeats[index];
                    let newSeat = new Seat(object["section"], object["row"], object["seatNum"], object["acessible"], object["inSeasonSection"], object["defaultPrice"]);
                    seats.push(newSeat);
                }
    
                //Create and push the new seat section
                let newSeatSection = new SeatSection(objectSection["sectionName"], seats);
                seatSections.push(newSeatSection);
            }
            let venue: Venue = new Venue(seatSections);

            //Deserialize and build the Performance for the ticket
            let dataSetOfPerformances: any = JSON.parse(JSON.stringify(objectShow["performances"])); //Have to stringify to get parser to accept
            let performances: Performance[] = [];
            //Create the Performance Typescript objects
            for (var index in dataSetOfPerformances) {
                let objectPerformance = dataSetOfPerformances[index];

                //Deserialize and build the set of tickets in the performance
                let tickets: Ticket[] = [];
                let dataSetOfTickets: any[] = JSON.parse(JSON.stringify(objectPerformance["tickets"])); //Have to stringify to get parser to accept
                for (var index in dataSetOfTickets) {
                    let objectTicket = dataSetOfTickets[index];

                    //Deserialize and build the Seat for the ticket
                    let seatData: any = JSON.parse(JSON.stringify(objectTicket["seat"])); //Have to stringify to get parser to accept
                    let assignedSeat = new Seat(seatData["section"], seatData["row"], seatData["seatNum"], seatData["acessible"], seatData["inSeasonSection"], seatData["defaultPrice"]);

                    let newTicket = new Ticket(objectTicket["performance"], assignedSeat);
                    newTicket.setTicketStatus(objectTicket["ticketStatus"]);
                    newTicket.setPrice(objectTicket["price"]);
                    tickets.push(newTicket);
                }

                let newPerformance: Performance = new Performance(objectPerformance["performanceName"], objectPerformance["venueName"], new Date(objectPerformance["dateTime"]), venue);
                newPerformance.setTickets(tickets);
                performances.push(newPerformance);
            }

            let newShow: Show = new Show(venue, objectShow["showName"]);
            newShow.setPerformances(performances);
            this.deserializedData.push(newShow);
        }
    }

    //Create Ticket objects from JSON file
    deserializeTicket(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);
        //Create the TypeScript Ticket objects
        for (var index in dataSet) {
            let objectTicket = dataSet[index];

            //Deserialize and build the Seat for the ticket
            let seatData: any = JSON.parse(JSON.stringify(objectTicket["seat"])); //Have to stringify to get parser to accept
            let assignedSeat = new Seat(seatData["section"], seatData["row"], seatData["seatNum"], seatData["acessible"], seatData["inSeasonSection"], seatData["defaultPrice"]);

            let newTicket = new Ticket(objectTicket["performance"], assignedSeat);
            newTicket.setTicketStatus(objectTicket["ticketStatus"]);
            newTicket.setPrice(objectTicket["price"]);
            this.deserializedData.push(newTicket);
        }
    }

    //Create Venue objects from JSON file
    deserializeVenue(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScript Venue objects
        for (var index in dataSet) {
            let objectVenue = dataSet[index];
            let seatSections: SeatSection[] = [];

            //Deserialize and build the set of seat sections in the venue
            let dataSetOfSeatSections: any[] = JSON.parse(JSON.stringify(objectVenue["seatSections"])); //Have to stringify to get parser to accept
            //Create the TypeScript SeatSection objects
            for (var index in dataSetOfSeatSections) {
                let objectSection = dataSetOfSeatSections[index];
                let seats: Seat[] = [];
                //Deserialize and build the set of seats in the seat section
                let dataSetOfSeats: any[] = JSON.parse(JSON.stringify(objectSection["seats"])); //Have to stringify to get parser to accept
                //Create the TypeScript Seat objects to put in SeatSection
                for (var index in dataSetOfSeats) {
                    let object = dataSetOfSeats[index];
                    let newSeat = new Seat(object["section"], object["row"], object["seatNum"], object["acessible"], object["inSeasonSection"], object["defaultPrice"]);
                    seats.push(newSeat);
                }
    
                //Create and push the new seat section
                let newSeatSection = new SeatSection(objectSection["sectionName"], seats);
                seatSections.push(newSeatSection);
            }

             //Create and push the new venu
            let newVenue = new Venue(seatSections);
            this.deserializedData.push(newVenue);
        }
    }

    //Create Purchase objects from JSON file
    deserializePurchase(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScript Purchase objects
        for (var index in dataSet) {
            let objectPurchase = dataSet[index];

            //console.log("Object: " + JSON.stringify(objectPurchase))
            //console.log("\n\n\n")

            //Deserialize and build the set of tickets in the purchase
            let tickets: Ticket[] = [];
            let dataSetOfTickets: any[] = JSON.parse(JSON.stringify(objectPurchase["tickets"])); //Have to stringify to get parser to accept
            for (var index in dataSetOfTickets) {
                let objectTicket = dataSetOfTickets[index];

                //Deserialize and build the Seat for the ticket
                let seatData: any = JSON.parse(JSON.stringify(objectTicket["seat"])); //Have to stringify to get parser to accept
                let assignedSeat = new Seat(seatData["section"], seatData["row"], seatData["seatNum"], seatData["acessible"], seatData["inSeasonSection"], seatData["defaultPrice"]);

                let newTicket = new Ticket(objectTicket["performance"], assignedSeat);
                newTicket.setTicketStatus(objectTicket["ticketStatus"]);
                newTicket.setPrice(objectTicket["price"]);
                tickets.push(newTicket);
            }

            //Deserialize and build the attendee in the purchase
            let attendeeData : any = JSON.parse(JSON.stringify(objectPurchase["purchaser"])); //Have to stringify to get parser to accept
            let attendee = new Attendee(attendeeData["name"], attendeeData["address"], attendeeData["phoneNum"])

            //Create and push the new seat section
            let newPurchase = new Purchase(attendee);
            newPurchase.setConfNum(objectPurchase["confNum"]);
            newPurchase.updateTickets(tickets);
            newPurchase.setDate(new Date(objectPurchase["perfDateTime"]));
            this.deserializedData.push(newPurchase);
        }
    }

    //Create Season Ticket Holder objects from JSON file
    deserializeSeasonTicketHolder(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScript SeasonTicketHolder objects
        for (var index in dataSet) {
            let objectSeasonHolder = dataSet[index];

            //Deserialize and build the Seat for the season ticket holder
            let seatData: any = JSON.parse(JSON.stringify(objectSeasonHolder["seatAssignment"])); //Have to stringify to get parser to accept
            let assignedSeat = new Seat(seatData["section"], seatData["row"], seatData["seatNum"], seatData["acessible"], seatData["inSeasonSection"], seatData["defaultPrice"]);

            let newSeasonHolder = new SeasonTicketHolder(objectSeasonHolder["name"], objectSeasonHolder["address"], objectSeasonHolder["phoneNum"], assignedSeat);
            this.deserializedData.push(newSeasonHolder);
        }
    }

    //Return the current deserializedData
    getData() { return this.deserializedData };

    //Use if the ticket seller wants to export JSON info
    exportJSON(seasonTicketHolders: SeasonTicketHolder[]) {
        //Now serialize data
        const defaultSerializer = new JsonSerializer();

        //Convert the data from TypeScript objects to JSON data and save to the specified file 
        let data: string = defaultSerializer.serialize(seasonTicketHolders) as unknown as string;
        let datastr = JSON.stringify(data);
        fs.writeFileSync(__dirname + "/../exported_seasonTicketHolders.json", datastr);
    }

    //Use if the ticket seller wants to import JSON info to use in the backend
    importJSON(filePath: string) {
        //Retrieve the JSON data at the specified location
        const newData = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(newData);

        //Now serialize data
        const defaultSerializer = new JsonSerializer();

        //Convert the data from TypeScript objects to JSON data and save to the specified file 
        let data: string = defaultSerializer.serialize(dataSet) as unknown as string;
        let datastr = JSON.stringify(data);
        fs.writeFileSync("./seasonTicketHolders.json", datastr);
    }
}