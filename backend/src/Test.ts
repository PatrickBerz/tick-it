import { Purchase } from "./Purchase"
import { Attendee } from "./Attendee";
import { ConfNum } from "./ConfNum";

export class Test {

    constructor() {
        


        let purchases = Array<Purchase>(5)
        for (let i = 0; i < 5; i++){
            purchases[i] = new Purchase(new Attendee("name", "addr", "phone"), ConfNum.getNum(), [])
        }

        //console.log(purchases)

        purchases.forEach(element => {
            console.log(element.getConfNum())
        });
    }
    
}

let sys:Test = new Test();