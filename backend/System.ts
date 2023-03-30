//import { serialize } from "./JSONHandler"
//import { deserialize } from "./JSONHandler"
import { JsonSerializer, throwError } from 'typescript-json-serializer';
import { Seat } from "../frontend/src/Seat";
import * as fs from 'fs';

export class System {

    constructor() {

        // Instantiate a default serializer
        const defaultSerializer = new JsonSerializer();

        let obj: Seat = new Seat("Orchestra", "B", 12, false, false, 29.99);
        let obj2: Seat = new Seat("Nodebleeds", "X", 3, false, false, 4.99);
        let coll: Seat[] = [];
        coll.push(obj);
        coll.push(obj2);
        let data: string = defaultSerializer.serialize(coll) as unknown as string;
        let datastr = JSON.stringify(data);
        fs.writeFileSync("test1.json", datastr);

        console.log("Serialized obj " + JSON.stringify(coll));


        const data2 = fs.readFileSync("test1.json", 'utf8');
        //const set = defaultSerializer.deserialize(data2, Seat);
        console.log("\n\n\n\n");
        //console.log("Deserialized: " + JSON.stringify(set));
        console.log("Deserialized: " + JSON.stringify(JSON.parse(data2)));
        console.log("\n\n")
        let set2: Array<Seat> = JSON.parse(data2);
        //console.log(JSON.stringify(set2));
       
        let seat = set2[0];
        console.log(seat);
        //seat.getAcessible();
        let newSeat = new Seat(seat["section"], seat["row"], seat["seatNum"], seat["acessible"], seat["inSeasonSection"], seat["defaultPrice"]);
        console.log(newSeat.getDefaultPrice());
    }
}

let sys: System = new System();