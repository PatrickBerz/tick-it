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
        let coll: Set<Seat> = new Set<Seat>();
        coll.add(obj);
        let data: string = defaultSerializer.serialize(obj) as unknown as string;
        fs.writeFileSync("test1.json", data);

        console.log("Serialized obj " + JSON.stringify(obj));

        const set = defaultSerializer.deserializeObject(data, Seat);
        console.log("\n\n\n\n");
        console.log("Deserialized: " + JSON.stringify(set));
    }
}

let sys: System = new System();