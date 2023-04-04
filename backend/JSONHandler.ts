import { JsonSerializer } from 'typescript-json-serializer';
import { Seat } from "../frontend/src/Seat";
import { Ticket } from "../frontend/src/Ticket";
import { Performance } from "../frontend/src/Performance";
import { SeatSection } from "../frontend/src/SeatSection";
import { Attendee } from "../frontend/src/Attendee";
import { Venue } from "../frontend/src/Venue";
import { SeasonTicketHolder } from "../frontend/src/SeasonTicketHolder";
import { Show } from "../frontend/src/Show";
import { Purchase } from "../frontend/src/Purchase";
import * as fs from 'fs';

export class JSONHandler {
    private deserializedData : any[] = [];

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

    //TO - DO !!!!!!!!!!!!!!!
    deserializePerformance(filePath: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        for (var index in dataSet) {
            let objectPerformance = dataSet[index];

            //Deserialize and build the show in the performance

            //Deserialize and build the date in the performance

            //Deserialize and build the set of 
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

    //TO - DO !!!!!!!!!!!!!!!
    //Create Show objects from JSON file
    deserializeShow(filePath: string) {

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

            //TO DO
            //Deserialize and build the Perofrmance for the ticket
            let performanceData: any = JSON.parse(JSON.stringify(objectTicket["performance"])); //Have to stringify to get parser to accept
            //PERFORMANCE
                //show data
                    //venue data
                        //seat sections
                            //seats
                    //show name
                    //performance
                        //CYCLE CONTINUES
                //dateTime
                //tickets
                

            //Deserialize and build the Seat for the ticket
            let seatData: any = JSON.parse(JSON.stringify(objectTicket["seatAssignment"])); //Have to stringify to get parser to accept
            let assignedSeat = new Seat(seatData["section"], seatData["row"], seatData["seatNum"], seatData["acessible"], seatData["inSeasonSection"], seatData["defaultPrice"]);

            //let newTicket = new Ticket(performance, assignedSeat);
            //newTicket.setTicketStatus(objectTicket["ticketStatus"]);
            //newTicket.setPrice(objectTicket["price"]);
            //this.deserializedData.push(newTicket);
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

    //TO - DO !!!!!!!!!!!!!!!
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
            let dataSetOfSeats: any[] = JSON.parse(JSON.stringify(objectPurchase["tickets"])); //Have to stringify to get parser to accept
            for (var index in dataSetOfSeats) {
                let object = dataSetOfSeats[index];
                //FIX NESTING
            }

            //Deserialize and build the attendee in the purchase
            let attendeeData : any = JSON.parse(JSON.stringify(objectPurchase["purchaser"])); //Have to stringify to get parser to accept
            let attendee = new Attendee(attendeeData["name"], attendeeData["address"], attendeeData["phoneNum"])

            //Create and push the new seat section
            let newPurchase = new Purchase(attendee);
            newPurchase.setConfNum(objectPurchase["confNum"]);
            newPurchase.updateTickets(tickets);
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
let obj: Seat = new Seat("Orchestra", "B", 12, false, false, 29.99);
let obj2: Seat = new Seat("Nosebleeds", "X", 3, false, false, 4.99);
let coll: Seat[] = [];
coll.push(obj);
coll.push(obj2);

//TEST SEAT SECTION
let coll2: SeatSection[] = [];
let obj3: SeatSection = new SeatSection("8", coll);
coll2.push(obj3);
let sys: JSONHandler = new JSONHandler();
//sys.serialize(coll2, "test3.json");
//sys.deserializeSeatSection("test3.json");
//sys.checkData();

//TEST VENUE
let coll3: Venue[] = []
let obj4: Venue = new Venue(coll2);
coll3.push(obj4);
coll3.push(obj4);
//sys.serialize(coll3, "test4.json");
//sys.deserializeVenue("test4.json");
//sys.checkData();

//TEST SEASON TICKET HOLDERS
let coll4: SeasonTicketHolder[] = []
let obj5: SeasonTicketHolder = new SeasonTicketHolder("Susan", "123 Sesame Street", "6064152452", obj);
coll4.push(obj5);
//sys.(coll4, "test4.json");
//sys.deserializeSeasonTicketHolder("test4.json");

//TEST TICKETS
let coll5: Ticket[] = [];
let obj8: Show = new Show(obj4, "West Side Story");
let date: Date = new Date();
//let obj7: Performance = new Performance(obj8, date);
//let obj6: Ticket = new Ticket(obj7, obj);
//coll5.push(obj6);
//sys.serialize(coll5, "test5.json");

//TEST NEW JSON VENUE STRUCTURE
sys.deserializeVenue("sampleVenue.json");
sys.checkData();