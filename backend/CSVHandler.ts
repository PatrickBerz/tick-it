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
import * as csv from 'csv';
import { JsonSerializer } from 'typescript-json-serializer';
import { JSONHandler } from "./JSONHandler";
let Papa = require('papaparse');
let csvToJson = require('convert-csv-to-json');

export class CSVHandler {
    private deserializedData : any[] = [];

    //Used to construct a new instance of the CSV class
    constructor() {
        this.deserializedData = [];
    }

    //Use to import user's CSV data and store it as JSON data in database
    importCSV(csvfilePath: string, jsonFilePath: string) {
        //Convert from CSV to JSON
        csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(csvfilePath, jsonFilePath);

        //Use the generated JSON to make SeasonTicketHolder objects for use in the final JSON
        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        let dataSet : any[] = JSON.parse(data);

        let seasonTicketHolders: SeasonTicketHolder[] = [];
        //Create the TypeScript SeasonTicketHolder objects
        for (var index in dataSet) {
            let obj = dataSet[index];

            //Deserialize and build the Seat for the season ticket holder
            let acessibleValue: boolean;
            if (obj["seatAssignment/acessible"] == "false") {
                acessibleValue = false;
            } else {
                acessibleValue = true;
            }
            let seasonSection: boolean;
            if (obj["seatAssignment/inSeasonSection"] == "false") {
                seasonSection = false;
            } else {
                seasonSection = true;
            }
            let assignedSeat = new Seat(obj["seatAssignment/section"], obj["seatAssignment/row"], (+obj["seatAssignment/seatNum"]), 
                                acessibleValue, seasonSection, (+obj["seatAssignment/defaultPrice"]));
            let newSeasonHolder = new SeasonTicketHolder(obj["name"], obj["address"], obj["phoneNum"], assignedSeat);
            seasonTicketHolders.push(newSeasonHolder);
        }

        //Now that we have the right form of data, use JSON Handler
        let JSONsys: JSONHandler = new JSONHandler();
        JSONsys.serialize(seasonTicketHolders, "./seasonTicketHolders.json");

        /*console.log("TEST!!!!!!!!!!!!!!!!!!!");
        JSONsys.deserializeSeasonTicketHolder("./seasonTicketHolders.json");
        let testData: any[] = JSONsys.getData();
        if (!testData[0].getSeatAssignment().getAcessible()) {
            console.log("IT WORKED!");
        } else {
            console.log("DID NOT WORK!");
        }*/
    }

    //Use to let ticket seller's export info from JSON database as CSV
    exportCSV() {
        //Get JSON objects
        let JSONsys: JSONHandler = new JSONHandler();
        let data : SeasonTicketHolder[] = [];
        JSONsys.deserializeSeasonTicketHolder("./seasonTicketHolders.json");
        data = JSONsys.getData();

        let dataStr = Papa.unparse(data);
        fs.writeFileSync("../exported_seasonTicketHolders.csv", dataStr);
    }
}

let sys: CSVHandler = new CSVHandler();
sys.importCSV("seasonTH.csv", "TESTCONVERSION.json");
sys.exportCSV();