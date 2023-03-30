import { serialize } from "./JSONHandler"
import { deserialize } from "./JSONHandler"
import { Seat } from "../frontend/src/Seat"

export class System {

    constructor() {
        let obj: Seat = new Seat("Orchestra", "B", 12, false, false, 29.99);
        let coll: Set<Seat> = new Set<Seat>();
        coll.add(obj);
        serialize(coll, "test1.json");

        console.log("Serialized obj " + JSON.stringify(obj));

        let set: Set<Seat> = deserialize("test1.json");
        console.log("\n\n\n\n");
        console.log("Deserialized: " + JSON.stringify(set));
    }
}

let sys: System = new System();