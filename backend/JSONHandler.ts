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

        console.log("Serialized obj " + JSON.stringify(dataSet));
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

            let newPerformance: Performance = new Performance(objectPerformance["performanceName"], objectPerformance["venueName"], objectPerformance["dateTime"]);
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

                let newPerformance: Performance = new Performance(objectPerformance["performanceName"], objectPerformance["venueName"], objectPerformance["dateTime"]);
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
            newPurchase.setDate(objectPurchase["perfDateTime"]);
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

    
    //TEST FUNCTION TO DEMONSTRATE WORKING
    checkData() {
        console.log('\n\n\n\n');
        for (var index in this.deserializedData) {
            //console.log("SEAT ROW: " + this.deserializedData[index].getRow());
            //console.log("SECTIONNUM: " + this.deserializedData[index].getSectionNum());
            console.log(this.deserializedData[index]);
        }
        console.log(this.deserializedData.length);
    }
}

//CODE USED TO TEST
//TEST SEAT
//let obj: Seat = new Seat("Orchestra", "B", 12, false, false, 29.99);
//let obj2: Seat = new Seat("Nosebleeds", "X", 3, false, false, 4.99);
//let coll: Seat[] = [];
//coll.push(obj);
//coll.push(obj2);

//TEST SEAT SECTION
//let coll2: SeatSection[] = [];
//let obj3: SeatSection = new SeatSection("8", coll);
//coll2.push(obj3);
//let sys: JSONHandler = new JSONHandler();
//sys.serialize(coll2, "test3.json");
//sys.deserializeSeatSection("test3.json");
//sys.checkData();

//TEST VENUE
//let coll3: Venue[] = []
//let obj4: Venue = new Venue(coll2);
//coll3.push(obj4);
//coll3.push(obj4);
//sys.serialize(coll3, "test4.json");
//sys.deserializeVenue("test4.json");
//sys.checkData();

//TEST SEASON TICKET HOLDERS
//let coll4: SeasonTicketHolder[] = []
//let obj5: SeasonTicketHolder = new SeasonTicketHolder("Susan", "123 Sesame Street", "6064152452", obj);
//coll4.push(obj5);
//sys.(coll4, "test4.json");
//sys.deserializeSeasonTicketHolder("test4.json");

//TEST TICKETS
//let coll5: Ticket[] = [];
//let obj6: Ticket = new Ticket("West Side Story", obj);
//coll5.push(obj6);
//sys.serialize(coll5, "test5.json");
//sys.deserializeTicket("test5.json");
//sys.checkData();

//TEST PURCHASE
//let obj9: Attendee = new Attendee("Susan Sawyer", "123 Sesame Street", "6064135244");
//let date: Date = new Date();
//let obj11: Performance = new Performance("West Side Story", "Playhouse", date);
//let obj10: Purchase = new Purchase(obj9);
//obj10.updateTickets(coll5);
//obj10.setDate(obj11.getDateTime());
//let coll6: Purchase[] = [];
//coll6.push(obj10);
//sys.serialize(coll6, "test6.json");
//sys.deserializePurchase("test6.json");
//sys.checkData();

//TEST NEW JSON VENUE STRUCTURE
//sys.deserializeVenue("sampleVenue.json");
//let venue: Venue = sys.getData()[0];
//sys.checkData();

//TEST PERFORMANCE
//obj11.setTickets(coll5);
//let coll7: Performance[] = [];
//coll7.push(obj11);
//sys.serialize(coll7, "test7.json");
//sys.deserializePerformance("test7.json");
//sys.checkData();

//TEST SHOW
//let coll8: Show[] = [];
//let obj12: Show = new Show(venue, "West Side Story: LIVE!");
//obj12.setPerformances(coll7);
//coll8.push(obj12);
//sys.serialize(coll8, "test8.json");
//sys.deserializeShow("test8.json");
//sys.checkData();