import { JsonSerializer } from 'typescript-json-serializer';
import { Seat } from "../frontend/src/Seat";
import { Ticket } from "../frontend/src/Ticket";
import { Performance } from "../frontend/src/Performance";
import { SeatSection } from "../frontend/src/SeatSection";
import * as fs from 'fs';

export class JSONHandler {
    private deserializedData : any[] = [];

    constructor(dataSet: any[], filePath : string) {
        this.deserializedData = []; //Set data to empty
        
        //Instantiate a default serializer
        const defaultSerializer = new JsonSerializer();

        //Convert the data from TypeScript objects to JSON data and save to the specified file 
        let data: string = defaultSerializer.serialize(dataSet) as unknown as string;
        let datastr = JSON.stringify(data);
        fs.writeFileSync(filePath, datastr);

        console.log("Serialized obj " + JSON.stringify(dataSet));
    }

    deserialize(filePath: string, type: string) {
        this.deserializedData = []; //Clear out any previous data

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("\n\n\n\n");
        console.log("Deserialized: " + JSON.stringify(JSON.parse(data)));
        console.log("\n\n")
        let dataSet : any[] = JSON.parse(data);

        //Create the TypeScripts based off of the type given
        if (type == "seat") {
            for (var index in dataSet) {
                let object = dataSet[index];
                let newSeat = new Seat(object["section"], object["row"], object["seatNum"], object["acessible"], object["inSeasonSection"], object["defaultPrice"]);
                this.deserializedData.push(newSeat);
            }
        } else if (type == "seatSection") {
            for (var index in dataSet) {
                let objectSection = dataSet[index];

                //Deserialize the set of seats
                let seats: Seat[] = [];
                let dataSetOfSeats: any[] = JSON.parse(JSON.stringify(objectSection["seats"])); //Have to stringify to get parser to accept
                //Build the set of seats in the seat section
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
    }

    //TEST FUNCTION TO DEMONSTRATE WORKING
    checkData() {
        for (var index in this.deserializedData) {
            //console.log("SEAT ROW: " + this.deserializedData[index].getRow());
            //console.log("SECTIONNUM: " + this.deserializedData[index].getSectionNum());
            console.log(this.deserializedData[index]);
        }
    }
}

//CODE USED TO TEST
let obj: Seat = new Seat("Orchestra", "B", 12, false, false, 29.99);
let obj2: Seat = new Seat("Nosebleeds", "X", 3, false, false, 4.99);
let coll: Seat[] = [];
coll.push(obj);
coll.push(obj2);

let coll2: SeatSection[] = [];
let obj3: SeatSection = new SeatSection("8", coll);
coll2.push(obj3);

let sys: JSONHandler = new JSONHandler(coll2, "test3.json");
sys.deserialize("test3.json", "seatSection");
sys.checkData();