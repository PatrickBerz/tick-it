import { SeasonTicketHolder } from "./src/SeasonTicketHolder";
import * as fs from 'fs';

//NOTE: IS NOT COMPLETELY FUNCTIONAL, SO THEREFORE IS NOT USED BY PROGRAM
//      importCSV has issues
export class CSVHandler {
    private deserializedData : any[] = [];
    private converter = require('json-2-csv');

    //Used to construct a new instance of the CSV class
    constructor() {
        this.deserializedData = [];
    }

    //Use to import user's CSV data and store it as JSON data in database
    importCSV(filePath: string) {
        //Convert from CSV to JSON
        let contents: string = fs.readFileSync(filePath, 'utf8');
        let csv2jsonCallback = function (err: any, json: any) {
            if (err) throw err;
        }
        let convertedContents = this.converter.csv2json(contents, csv2jsonCallback);
        console.log(convertedContents);
        

        //Use the generated JSON to make SeasonTicketHolder objects for use in the final JSON
        //Retrieve the JSON data at the specified location
        //const data = fs.readFileSync(__dirname + "/convertedCSV.json", 'utf8');
        /*let dataSet : any[] = JSON.parse(JSON.stringify(csvToJson.csv2json(csvData)));
        console.log(dataSet);

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
        console.log(JSON.stringify(seasonTicketHolders));
        JSONsys.serialize(seasonTicketHolders, (__dirname + "/seasonTicketHolders.json"));*/
    }

    //Use to let ticket seller's export info from JSON database as CSV
    exportCSV(seasonTicketHolders: SeasonTicketHolder[]) {
        //Get JSON objects
        let data = seasonTicketHolders;
        
        //Manually convert information to CSV 
        let header: string = "name,address,phoneNum,seatAssignment/section,seatAssignment/row,seatAssignment/seatNum,seatAssignment/acessible,seatAssignment/inSeasonSection,seatAssignment/defaultPrice";
        let body : string = "";
        for (var index in data) {
            body = body.concat(("\n" + data[index].getName() + ","));
            body = body.concat(data[index].getAddress() + ","); 
            body = body.concat((data[index].getPhoneNum() + ","));
            body = body.concat(data[index].getSeatAssignment().getSection() + ",");
            body = body.concat(data[index].getSeatAssignment().getRow() + ",");
            body = body.concat(data[index].getSeatAssignment().getSeatNum() + ",");
            body = body.concat(data[index].getSeatAssignment().getAcessible() + ","); 
            body = body.concat(data[index].getSeatAssignment().getInSeasonSection() + ","); 
            body = body.concat(data[index].getSeatAssignment().getDefaultPrice() + ","); 
        }

        //Write the CSV-style string to the file
        header = header.concat(body);
        fs.writeFileSync((__dirname + "/../exported_seasonTicketHolders.csv"), header);
    }
}