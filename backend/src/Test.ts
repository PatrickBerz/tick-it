import { Purchase } from "./Purchase"
import { Attendee } from "./Attendee";

export class Test {

    constructor() {
        


        let purchases = Array<Purchase>(5)
        for (let i = 0; i < 5; i++){
            purchases[i] = new Purchase(new Attendee("name", "addr", "phone"), [])
        }

        console.log(purchases)

        purchases.forEach(element => {
            console.log(element.getConfNum())
        });
    }
    
}

let sys:Test = new Test();