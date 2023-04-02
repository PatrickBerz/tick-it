import { JsonSerializer } from 'typescript-json-serializer';
import { Seat } from "../frontend/src/Seat";
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

        //Retrieve the JSON data at the specified location
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("\n\n\n\n");
        console.log("Deserialized: " + JSON.stringify(JSON.parse(data)));
        console.log("\n\n")
        //let set2: Array<Seat> = JSON.parse(data);
        let dataSet : any[] = JSON.parse(data);

        if (type == "seat") {
            for (var index in dataSet) {
                let object = dataSet[index];
                let newSeat = new Seat(object["section"], object["row"], object["seatNum"], object["accessible"], object["inSeasonSection"], object["defaultPrice"]);
                this.deserializedData.push(newSeat);
            }
            /*let seat = set2[0];
            console.log(seat);
            let newSeat = new Seat(seat["section"], seat["row"], seat["seatNum"], seat["acessible"], seat["inSeasonSection"], seat["defaultPrice"]);
        console.log(newSeat.getDefaultPrice());*/
        }
    }

    //TEST FUNCTION TO DEMONSTRATE WORKING
    checkData() {
        for (var index in this.deserializedData) {
            console.log("SEAT ROW: " + this.deserializedData[index].getRow());
        }
    }
}

//CODE USED TO TEST
let obj: Seat = new Seat("Orchestra", "B", 12, false, false, 29.99);
let obj2: Seat = new Seat("Nodebleeds", "X", 3, false, false, 4.99);
let coll: Seat[] = [];
coll.push(obj);
coll.push(obj2);
let sys: JSONHandler = new JSONHandler(coll, "test2.json");
sys.deserialize("test2.json", "seat");
sys.checkData();